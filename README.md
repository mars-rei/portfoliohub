# portfoliohub
My final year project PortfolioHub: a portfolio site builder tailored for those in the creative industries.


## Setting up

Install PHP, Composer, the Laravel installer, Git, Node.js and NPM.

For Windows, run as administrator:
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.3'))
```
`winget install -e --id Git.Git`<br>
`winget install -e --id OpenJS.NodeJS`

For MacOS (requires Homebrew):
```
/bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.3)"
brew install git node
```

For Linux:
```
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.3)"
sudo apt update && sudo apt install -y git nodejs npm
```


## Clone the application

In Vscode:
```
CTRL + Shift + P
```

When prompted, click 'Git: clone'.

Then select 'Clone from GitHub'.

Search for 'mars-rei/portfoliohub' and select the project.


## Configuring the database (using Supabase)

You will currently have a file in the application's root folder called '.env.example'.

Rename the file to '.env'. (This helps protects the details you will be adding in the next few steps.)

Create an account on <a href="https://supabase.com/">Supabase</a>.

Create a project on Supabase using PortfolioHub as the 'Project name'. Note down the 'Database password' and allow 'Enable automatic RLS'.

After creating the project, there will be a connect button around the middle at the top of the page. Click this button and select the 'Direct Connection string' option.

For 'Connection Method', select 'Transaction pooler'.

Open the .env file and change the following fields to the values according to the connection string details and the database password you noted down earlier:

```
DB_HOST=<host>
DB_USERNAME=<user>
DB_PASSWORD=<password>
```


## Configuring the SMTP server (using Mailtrap)

To receive emails for email verification and user authentication, you can use Mailtrap's free subscription. When a user registers to PortfolioHub, the email will be sent to the Mailtrap sandbox for you to interact with.

Create an account on <a href="https://mailtrap.io/">Mailtrap</a>.

On the home page there should be a 'Testing Sandbox' tab. If a sandbox has not been created, create one and fill the .env file with the following details:

```
MAIL_USERNAME=<username>
MAIL_PASSWORD=<password>
```


## Configuring cloud storage (using Cloudinary)

Create an account on <a href="https://cloudinary.com/">Cloudinary</a>.

Go to the 'API Keys' section in Settings and generate an API key.

Fill in the following details in the .env file (the cloudinary url is formatted in this way: cloudinary://<api key>:<api secret>@<cloud name>):

```
CLOUDINARY_URL=<url>
CLOUDINARY_CLOUD_NAME=<cloud name>
CLOUDINARY_API_KEY=<api key>
CLOUDINARY_API_SECRET=<api secret>
```


## Final installations

After doing configuring Supabase, Mailtrap and Cloudinary in the .env file, run the commands:
```
npm install
composer install 
php artisan key:generate
php artisan migrate
```


## Running the application

Open a terminal in VS Code and run the following command:
```
php artisan serve
```

Open another terminal and run:
```
npm run dev
```

After running `npm run dev`, there will be red text showing the Laravel version, and underneath, a link to the application's URL.

Click the `APP_URL` in the terminal you ran `php artisan serve` in to access the application via your local host.