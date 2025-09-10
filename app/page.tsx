import CarCard from "@/components/CarCard";
import { 
  CustomFilter, 
  Hero, 
  SearchBar 
} from "@/components";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { HomeProps } from "@/types";

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const manufacturer = params.manufacturer || "";
  const year = params.year ? parseInt(params.year) : 2022;
  const fuel = params.fuel || "";
  const model = params.model || "";

  const allCars = await fetchCars({
    manufacturer,
    year: isNaN(year) ? 2022 : year,
    fuel,
    model,
  });

  const isDataEmpty = !Array.isArray(allCars) ||
  allCars.length <1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y
      max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4x1 font-extrabold">
            Car catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
              {/* <CustomFilter title="fuel" />
              <CustomFilter title="year" /> */}
          </div>
        </div>

          {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => (
                  <CarCard key={crypto.randomUUID()} car={car} />
                ))}
              </div>
            </section>
          ): (
            <div className="home__error-container">
              <h2 className="text-black text-xl
              font-bold">Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )}

      </div>
    </main>
  );
}
