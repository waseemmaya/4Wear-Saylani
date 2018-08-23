const staticAssets = [
  "./",
  "./index.html",
  "./JS_Practice.html",
  "./todo.html",
  "./cars.html",
  "./mobiles.html",
  "./laptop.html",
  "./postAd.html",
  "./login.html",
  "./signup.html",
  "./adPage.html",
  "./main/allads.js",
  "./main/car.js",
  "./main/laptop.js",
  "./main/mobile.js",
  "./main/postads.js",
  "./main/search.js",
  "./main/main.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("v1").then(res => {
      console.log("wait.........!");
      return res.addAll(staticAssets);
    })
  );
  console.log("installed");
  // var cache = caches.open('v1');
  // cache.addAll(staticAssets);
});

self.addEventListener("activate", event => {
  console.log("activated");
});

self.addEventListener("fetch", ev => {
  // console.log('Fetch from Service Worker ', ev);
  const req = ev.request;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    ev.respondWith(cacheFirst(req));
  }
  return ev.respondWith(networkFirst(req));
});

async function cacheFirst(req) {
  let cacheRes = await caches.match(req);
  return cacheRes || fetch(req);
}

async function networkFirst(req) {
  const dynamicCache = await caches.open("v1-dynamic");
  try {
    const networkResponse = await fetch(req);
    dynamicCache.put(req, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cacheResponse = await caches.match(req);
    return cacheResponse;
  }
}

// const staticAssets = [
//   './',
//   './index.html',
//   './index-2.html',
//   './cars-2.html',
//   './mobiles-2.html',
//   './laptop-2.html',
//   './add-2.html',
//   './login.html',
//   './signup.html',
//   './addpage.html',
//   './main/allads.js',
//   './main/car.js',
//   './main/laptop.js',
//   './main/mobile.js',
//   './main/postads.js',
//   './main/signout.js'
// ];

//   self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open('v1')
//         .then(res => {
//           console.log('wait.........!')
//           return res.addAll(staticAssets);
//         })
//     );
//     console.log('installed');
//     // var cache = caches.open('v1');
//     // cache.addAll(staticAssets);
//   });

//   self.addEventListener('activate', (event) => {
//     console.log('activated');
//   });

//   self.addEventListener('fetch', (ev) => {
//     console.log('Fetch from Service Worker ', ev);
//     const req = ev.request;
//     const url = new URL(req.url);
//     if (url.origin === location.origin) {
//       ev.respondWith(cacheFirst(req));
//     }
//     return ev.respondWith(networkFirst(req));
//   });

//   async function cacheFirst(req) {
//     let cacheRes = await caches.match(req);
//     return cacheRes || fetch(req);
//   }

//   async function networkFirst(req) {
//     const dynamicCache = await caches.open('v1-dynamic');
//     try {
//       const networkResponse = await fetch(req);
//       dynamicCache.put(req, networkResponse.clone());
//       return networkResponse;
//     } catch (err) {
//       const cacheResponse = await caches.match(req);
//       return cacheResponse;
//     }
//   }

// var staticCacheName = 'static-v5';
// var dynamicCacheName = 'dynamic-v5'

// const staticAssets = [
//     './',
//     './index.html',
//     './index-2.html',
//     './cars-2.html',
//     './mobiles-2.html',
//     './laptop-2.html',
//     './add-2.html',
//     './login.html',
//     './signup.html',
//     './addpage.html',
//     './main/allads.js',
//     './main/car.js',
//     './main/laptop.js',
//     './main/mobile.js',
//     './main/postads.js',
//     './main/signout.js'
//   ];

// self.addEventListener('install', async (event) => {
//   // event.waitUntil(
//   //   caches.open('v1')
//   //     .then(res => {
//   //       console.log('wait.........!')
//   //       return res.addAll(staticAssets);
//   //     })
//   // );
//   // console.log('installed');
//   var cache = await caches.open(staticCacheName);//hi
//   cache.addAll(staticAssets);
// });

// self.addEventListener('activate', (event) => {
//   console.log('activated');
//   event.waitUntil(
//     caches.keys()
//       .then(function (keyList) {
//         return Promise.all(keyList.map(function (key) {
//           if (key !== staticCacheName && key !== dynamicCacheName) {
//             console.log('[Service Worker] Removing old cache.', key);
//             return caches.delete(key);
//           }
//         }));//check
//       })
//   );
// });

// self.addEventListener('fetch', (ev) => {
//   //console.log('Fetch from Service Worker ', ev);
//   const req = ev.request;
//   const url = new URL(req.url);
//   if (url.origin === location.origin) {
//     ev.respondWith(cacheFirst(req));
//   }
//   try {
//     return ev.respondWith(networkFirst(req));

//   } catch{

//   }
// });

// async function cacheFirst(req) {
//   let cacheRes = await caches.match(req);
//   return cacheRes || fetch(req);
// }

// async function networkFirst(req) {
//   const dynamicCache = await caches.open(dynamicCacheName);
//   try {
//     const networkResponse = await fetch(req);
//     dynamicCache.put(req, networkResponse.clone());
//     return networkResponse;
//   } catch (err) {
//     const cacheResponse = await caches.match(req);
//     return cacheResponse;
//   }
// }

// var staticCacheName = 'static-v5';
// var dynamicCacheName = 'dynamic-v5'
