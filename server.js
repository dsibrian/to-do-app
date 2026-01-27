/*
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const express = require("express");
const path = require("path");
const fetch = require('node-fetch');


const app = express();
const port = process.env.PORT || 8080;


//Load products for pseudo database
const products = require("./data/products.json").products;

//Get all products
app.get("/service/products", (req, res) => res.json(products));

//Get products by ID
app.get("/service/products/:id", (req, res) =>
  res.json(products.find((product) => product.id === req.params.id))
);

app.get("/service/pokemon/ditto", async (req, res) => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
        
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Devolvemos el JSON completo de Ditto al cliente
        res.json(data);
        
    } catch (error) {
        console.error("Error al hacer fetch:", error);
        res.status(500).json({ error: "Hubo un problema obteniendo los datos de Ditto" });
    }
});

//Client side routing fix on page refresh or direct browsing to non-root directory
app.get("/*", function(req, res) {
    res.send("Hola")
});



//Start the server
app.listen(port, () => console.log(`Sample-node-app listening on port ${port}!`));
