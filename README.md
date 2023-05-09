# BigCommerce Stencil-CLI Environment Swap Tool 

The Stencil CLI swap tool will allow you to quickly and effortlessly toggle between various BigCommerce store environments, by storing credentials and automating CLI commands.  

# Using the Tool  

**GENERATE Stencil credentials** from your store's BigCommerce admin panel. Instructions on how to do that can be found [here](https://support.bigcommerce.com/s/article/Store-API-Accounts?language=en_US) (follow instructions for Stencil-CLI).

**Note:** A different set of credentials is required for each environment

---

**CONFIGURE the tool** by initializing each environment with the `stencil-swap init` command.

Available environments: **dev**, **staging**, **uat**, and **prod**

This command will do a few things:

- Prompt you for the access token and hash for your BigCommerce environment.

- Create the necessary directories for environment files, if not already present

- Clone the config.json file from your project's root to an environment-specific config JSON file

---  

**MODIFY the environment** by editing the respective config.json file found in the `env/config` directory

---  

**SWAP** environments by running `stencil-swap set <dev|staging|uat|prod>`