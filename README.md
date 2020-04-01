# way-merchant-dashboard

A dashboard for connected merchants to get an overview of their Way checkout flow.

![Alt Text](https://media1.giphy.com/media/qqtvGYCjDNwac/giphy.gif?cid=ecf05e47943ce736693fad5f7895f2b27b4e279dbf9f24eb&rid=giphy.gif)

## firebase

You will need to create a `.env` file to connect to the database. This needs to be saved at `client/.env`:

```
REACT_APP_API_KEY=XXXXXX
REACT_APP_AUTH_DOMAIN=XXXXXX
REACT_APP_DB_URL=XXXXXX
REACT_APP_PROJECT_ID=XXXXXX
REACT_APP_STORAGE_BUCKET=XXXXXX
REACT_APP_MESSAGING_ID=XXXXXX
REACT_APP_APPID=XXXXXX
```

## using the custom APIs

**_Products_**

Returns a product image from the ICA database, based on the product GTIN number in the order items data. There are 5 edge cases where ICA does not have the image, in which case we load the image from a local file database.

`GET /api/products/_GTIN_`

```
{
   "path": "https://assets.icanet.se/t_product_large_v1,f_auto/8717163691618.jpg"
}
```

Any errors return a 404.

**_Customers_**

Returns either an array of 10 customers, or 1 random customer from the [Random User Generator API](https://randomuser.me/)

`GET /api/customers`

```
[
  {
      "id": "43cd510b-de02-42b6-8264-c7eced4d5ff4",
      "name": "Eric Douglas",
      "picture": "https://randomuser.me/api/portraits/men/79.jpg"
  },
  ...
]
```

## dev guidelines

1. Only use functional components with hooks.
2. Component declarations should use the `function App...` style:
   `export default function App() {...}`
3. Logic functions inside components should use ES6 arrow functions:
   `const logic = () => {...}`
