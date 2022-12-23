<template>
  <div class="px-16 pt-20">
    <div class="gap-y-6 lg:flex lg:justify-between">
      <div class="bg-yellow-400">Weather Dashboard</div>
      <div>
        <div class="grid w-full grid-cols-5 bg-green-300">
          <div class="col-span-4 w-[300px] bg-red-500">item</div>
          <div>item</div>
        </div>
      </div>
    </div>
    <div class="grid gap-8 xl:grid-cols-3">
      <div class="space-x-2 rounded-xl border-2 bg-white py-4 xl:col-span-2">
        <div>
          <div class="p-4">
            <h2>Forecast in <span class="location">New York, US</span></h2>

            <p>Friday, 23 December at 10:27 am</p>
          </div>

          <section class="grid gap-4 space-x-0 px-4 md:grid-cols-6">
            <!-- Description -->

            <!-- Weather descr -->
            <div class="col-span-3 rounded-md border-2 p-4">
              <div class="flex h-full flex-col justify-between">
                <div class="flex items-start justify-between">
                  <div class="temperature">48F</div>
                  <div>
                    <div>High 49°F</div>
                    <div>Low 45°F</div>
                  </div>
                </div>
                <div class="flex items-start justify-between">
                  <ul>
                    <li>Mist</li>
                    <li>Feels like 40°F</li>
                    <li>Poor Visibility</li>
                  </ul>
                  <div>IMG</div>
                </div>
              </div>
            </div>
            <!-- visibility -->

            <div class="col-span-2 mx-auto rounded-xl border-2 p-1">
              <ul class="w-80 space-y-2 underline underline-offset-8">
                <li>Visibility</li>
                <li>Dew Point</li>
                <li>Wind</li>
                <li>Humidity</li>
                <li>Cloudiness</li>
              </ul>
            </div>
            <div class="container rounded-xl border-2">
              <div class="card-img-overlay text-center">
                <i class="fa-solid fa-sun"></i>
                <h3 lass="fw-light">Sunrise</h3>
                <h2 id="sunrise-time">06:35 AM</h2>
                <br />
                <i class="fa-solid fa-moon"></i>
                <h3 lass="fw-lighter">Sunset</h3>
                <h2 id="sunset-time">06:26 PM</h2>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class="rounded-xl bg-white p-5">
        <!-- other cities forecast -->
        <p>Forecast in Other Cities</p>
        <!-- Cities and forecast with animations -->
        <ol>
          <li v-for="(item, id) in 6" :key="id">
            <div class="flex justify-between border-t py-4">
              <div class="flex flex-col">
                <div>Dubia {{ item }}</div>
                <div>AE</div>
              </div>
              <div>
                <div>IMG</div>
              </div>
              <div class="flex flex-col">
                <div>77F</div>
                <div>Clear sky</div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
