import CarCard from "@/components/CarCard";
import { 
  CustomFilter, 
  Hero, 
  SearchBar, 
  ShowMore
} from "@/components";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { HomeProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const manufacturer = params.manufacturer || "";
  const year = params.year ? Number(params.year) : 2025;
  const fuel = params.fuel || "";
  const model = params.model || "";
  const limit = params.limit ? Number(params.limit) : 10;

  const allCars = await fetchCars({
    manufacturer,
    year: isNaN(year) ? 2022 : year,
    fuel,
    model,
    limit
  });

  const isDataEmpty = !Array.isArray(allCars) ||
  allCars.length <1 || !allCars;

  const currentLimit = Number(params.limit) || 10;
  const pageNumber = currentLimit / 10;
  const isNext = allCars.length <= currentLimit;

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
          <CustomFilter title="fuel" options={fuels} />
          <CustomFilter title="year" options={yearsOfProduction} />
        </div>
        </div>

          {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => (
                  <CarCard key={crypto.randomUUID()} car={car} />
                ))}
              </div>

              <ShowMore
                pageNumber={pageNumber}
                isNext={false}
              />
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
