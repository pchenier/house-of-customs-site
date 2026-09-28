/* HOC vehicle + tune data. Verified against getunitronic.com pages listed in sources, 2026-09-27.
   Prices were visible at research time only; region-dependent. No HOC pricing, install cost or dealer status implied. */
window.HOC_DATA = {
  "vehicles": [
    {
      "id": "audi-s3-8v",
      "brand": "Audi",
      "model": "S3",
      "gen": "8V facelift",
      "years": "2016–2019",
      "engine": "2.0 TSI EA888 Gen 3",
      "body": "Sedan 8V facelift",
      "status": "preview",
      "images": {
        "front": "s3-front.png",
        "rear": "s3-rear.png"
      },
      "tunes": [
        {
          "stage": "Stage 1",
          "stock": "292 HP / 280 lb-ft",
          "tuned": "355 HP / 338 lb-ft",
          "fuel": "91 AKI / 95 RON",
          "price": "650 USD (Software only, at time of research)",
          "source": "https://www.getunitronic.com/ecu-tuning/audi-s3-20l-tsi-gen3-2016-2017/",
          "verified": "2026-09-27"
        }
      ]
    },
    {
      "id": "audi-a3-8v",
      "brand": "Audi",
      "model": "A3",
      "gen": "8V",
      "years": "2016–2018",
      "engine": "2.0 TSI EA888 Gen 3 (quattro)",
      "body": "Sedan",
      "status": "tune-data",
      "images": {},
      "tunes": [
        {
          "stage": "Stage 1",
          "stock": "220 HP / 258 lb-ft",
          "tuned": "297 HP / 346 lb-ft",
          "fuel": "91 AKI / 95 RON",
          "price": "650 USD (Software only, at time of research)",
          "source": "https://www.getunitronic.com/ecu-tuning/Audi-A3-20L-TSI-2016-stage1",
          "verified": "2026-09-27"
        }
      ]
    },
    {
      "id": "vw-gti-mk7",
      "brand": "Volkswagen",
      "model": "Golf GTI",
      "gen": "Mk7",
      "years": "2015",
      "engine": "2.0 TSI EA888 Gen 3",
      "body": "Hatchback",
      "status": "tune-data",
      "images": {},
      "tunes": [
        {
          "stage": "Stage 1",
          "stock": "210 HP / 258 lb-ft",
          "tuned": "297 HP / 346 lb-ft",
          "fuel": "91 AKI / 95 RON",
          "price": "Contact dealer for current software price",
          "source": "https://www.getunitronic.com/ecu-tuning/volkswagen-gti-20l-tsi-ea888-2015-2015-stage1",
          "verified": "2026-09-27"
        }
      ]
    },
    {
      "id": "vw-golf-r-mk7",
      "brand": "Volkswagen",
      "model": "Golf R",
      "gen": "Mk7",
      "years": "2019–2020",
      "engine": "2.0 TSI EA888 Gen 3",
      "body": "Hatchback",
      "status": "published",
      "images": {
        "front": "golf-front.png",
        "rear": "golf-rear.png",
        "steering": "golf-steering.png"
      },
      "tunes": [
        {
          "stage": "Stage 1+",
          "stock": "288 HP / 280 lb-ft",
          "tuned": "375 HP / 350 lb-ft",
          "fuel": "93 AKI / 98 RON",
          "price": "Contact dealer for current software price",
          "note": "Figures with Unitronic intake, charge pipe and turbo inlet.",
          "source": "https://www.getunitronic.com/ecu-tuning/vw-golfr-2019-stage1plus",
          "verified": "2026-09-27"
        }
      ]
    },
    {
      "id": "porsche-911",
      "brand": "Porsche",
      "model": "911",
      "gen": "",
      "years": "",
      "engine": "",
      "body": "Coupe",
      "status": "published",
      "images": {
        "front": "porsche-front.png",
        "rear": "porsche-rear.png",
        "steering": "porsche-steering.png"
      },
      "tunes": []
    },
    {
      "id": "audi-rs3-8v",
      "brand": "Audi",
      "model": "RS3",
      "gen": "8V facelift",
      "years": "2019–2020",
      "engine": "2.5 TFSI",
      "body": "Sedan",
      "status": "tune-data",
      "images": {},
      "tunes": [
        {
          "stage": "Stage 1",
          "stock": "",
          "tuned": "",
          "fuel": "",
          "price": "Contact dealer for current software price",
          "note": "Page required dealer contact; figures not captured.",
          "source": "https://www.getunitronic.com/ecu-tuning/audi-rs3-2019-stage1/",
          "verified": "2026-09-27"
        }
      ]
    }
  ]
};
