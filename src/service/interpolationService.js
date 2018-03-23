import model from '../model/index'
import {currency} from '../util/index'
import marked from 'marked'

marked.setOptions({
  renderer: new marked.Renderer()
  ,gfm: true
  ,tables: true
  ,breaks: true // false,
  ,pedantic: false
  ,sanitize: false
  ,smartLists: true
  ,smartypants: false
})

/**
 * Parse a string by interpolation
 * @param {string} key
 * @param {object} models
 * @param {boolean} doubled
 * @returns {string}
 * @todo only do double interpolation if applicable
 */
export function parse(key,models={},doubled=false){
  key = key.toString()
  // extend models
  !doubled && Object.assign(models,{
    data: model.personal
    ,copy: model.copy
    ,currency
    ,c: val=>currency(val,'€',2,'.',',') // todo: euro sign should be dynamic
  })
  //
  const keys = Object.keys(models)
  const values = Object.values(models)
  let interpolated
  try {
    // console.log('try',__(key).replace(/\n/g,'<br/>')); // todo: remove log
    // console.log('try',marked(key),{key}); // todo: remove log
    // const tpl = marked(__(key).replace(/\n/g,'<br/>')).replace(/^\s*<p>|<\/p>\s*$/g,'')
    const tpl = marked(__(key)).replace(/\n/g,'<br/>').replace(/^\s*<p>|<\/p>\s*$/g,'')
    interpolated = new Function(
      ...keys
      ,'return `'+tpl+'`'
    )(
      ...values
    )
  } catch (err){
    interpolated = '[interpolation error]'
    console.warn('Interpolation error',{key,models})
  }
  return doubled?interpolated:parse(interpolated,models,true)
}

/**
 * Internationalisation parser
 * @param {string} key
 * @returns {string}
 * @private
 */
export function __(key){
  const lang = model.config.lang
  const copy = model.copy[key]
  return copy&&(copy[lang]||copy.en)||key
}