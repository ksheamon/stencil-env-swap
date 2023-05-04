# BigCommerce Stencil-CLI Environment Swap Tool

The Stencil CLI switch tool will allow you to quickly and effortlessly toggle between various BigCommerce store environments, by storing credentials and automating CLI commands.

# Using the Tool

1. **GENERATE Stencil credentials** from your store's BigCommerce admin panel. Instructions on how to do that can be found [here](https://support.bigcommerce.com/s/article/Store-API-Accounts?language=en_US) (follow instructions for Stencil-CLI).
   **Note:** A different set of credentials is required for each environment

2. **CONFIGURE the tool** by updating each environment config file with the proper credentials
   > -- dev.env
   > -- staging.env
   > -- prod.env

   **Note:** It is imperative that these file names not be changed as they are explicitly referenced from the command file.

3. **SET environment-specific settings** by modifying the appropriate config.json 

3. **ADD the commands** to your package.json file by appending the 'scripts' section with the following:
   > "dev": "export LOCAL_ENV=dev && npm run setEnv && stencil start",
   > "staging": "export LOCAL_ENV=staging && npm run setEnv && stencil start",
   > "prod": "export LOCAL_ENV=prod && npm run setEnv && stencil start",
   > "setEnv": "npx ./env/setEnv.js -e $LOCAL_ENV",

4. **TEST** your integration by running `npm run <dev|staging|prod>`
