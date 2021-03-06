Project Invoice
===============

This invoicing application stores all your data on your local machine.
 
Your local documents are not shared between different browsers or computers.
Project Invoice is accessible offline after the application has been loaded for the first time. You can turn it into a mobile-web-app by using the add-to-home-screen from your mobile browser.

Project Invoice is an invoicing application intended for freelancers or other forms of self employed professionals.


## Getting Started

You can head to [Project Invoice](https://projectinvoice.nl) and start creating invoices.
Or you can make a local installation.

### Using the app

The basis is easy: you have [clients](https://projectinvoice.nl/clients), clients have projects, projects have invoices (and an optional quotation).
You can [tweak](https://projectinvoice.nl/layout) what your invoice will look like. You can print it to pdf ~~or png~~ format.
On the home or [overview page](https://projectinvoice.nl/overview) you can check outstanding invoices, or mark them as paid.

Everything you save is done so on the machine or device you are working on. To get your data from (say) your phone to your desktop you can [export](https://projectinvoice.nl/settings) the data to json, and import that file on a different device.
Clearing your browser's data may *delete all your local data*. Backup your data regularly!

### Running on localhost

To get the application running locally you only need NodeJS, npm and GIT. If you don't know what those are you might be better off simply using the [online version](https://projectinvoice.nl), your data will be just as safe.

`git clone https://github.com/Sjeiti/project-invoice.git`

`npm i`

`npm run start`
  

## faq

### Wait, this app is online in a browser. How is my private data not online?

Every site can access something called LocalStorage which resides on your local machine or device. This is where your data is stored. Websites can never access the LocalStorage of another website. Never will data be sent from your computer to the server. The only network communication is the application logic being sent from the server to your computer. All your private data remains on your own computer.
Unless of course you are using the cloud service, but this is turned off by default.

### Is this safe?

Storing your data on your local machine is safer than sending and receiving it over the internet. And since LocalStorage is so called origin-specific, only this website can read this websites LocalStorage. But you can also run this on localhost if your tech savvy enough. It is as safe as you treat your computers security.

### Don't I have to login with a username and password?

Logins are useful for server authentication. But since your data is stored on your local machine and not on a server, no authentication is needed.

### How can I access my data from different machines?

Since the data is stored locally you can only access it from one computer. However you can save and/or import the data from the settings page. You can also establish a peer-to-peer connection to transfer data between devices.

### I want to clear my LocalStorage to wipe all my data.

You can simply clear your LocalStorage from your devtools, but this app also has a button for that on the [settings page](https://projectinvoice.nl/settings).

### Is there an Android or IOS app for this?

Yes and no. No this is not in an App- or Play Store. Because yes: you can simply add this web application to your device desktop.
On Android navigate to the site, press the three vertical dots in the upper right corner and choose 'Add to home screen'.
On IOS Safari open the site, click the exit icon on the bottom and choose the 'Add to home screen' button.

### Why?

Being self-employed all my life means I've been sending invoices for quite a while. I've seen a lot of invoicing software/services but was never really satisfied.
So I created my own:

 - no cloud based data, everything is saved on your local machine, nothing is sent to a server
 - well designed and customizable invoices
 - easy to use
 - open-source
 - free
 - run it online or offline or even on a local server

I cleaned it up a bit because I thought you might like it.

## Contributing

The sources of this application are open-source and can be found at [Github](https://github.com/Sjeiti/project-invoice).
    
If you find a bug or have a good idea for a feature you can [file it there](https://github.com/Sjeiti/project-invoice/issues).
Please search the existing issues before submitting a new one.

If you want to contribute by fixing bugs or adding features yourself, please read the [contribution guidelines](https://github.com/Sjeiti/project-invoice/blob/master/CONTRIBUTING.md).


## License

This project is licensed under the MIT License - see the [LICENSE](https://raw.githubusercontent.com/Sjeiti/project-invoice/master/LICENSE) file for details