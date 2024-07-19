import { Separator } from "../../components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { cn } from "../../lib/utils";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "../../components/ui/sheet";
import { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsByFiltersAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  selectAllProducts,
  selectTotalItems,
  selectBrands,
  selectCategories,
  selectProductListStatus,
} from "./ProductSlice";
import { ITEMS_PER_PAGE } from "../../app/constants";
// import Pagination from "../../components/Common/Pagination";
import { FidgetSpinner, Vortex } from "react-loader-spinner";

import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Squares2X2Icon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
const sortOptions = [
  {
    name: "Price: Low to High",
    sort: "price",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "price",
    order: "desc",
    current: false,
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const Status = useSelector(selectProductListStatus);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectBrands);
  const filters = [
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  const totalItems = useSelector(selectTotalItems);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, []);
  return (
    <>
      <div className=" my-4 pt-3 mx-4">
        <div className="">
          <div className="grid lg:grid-cols-5">
            <div className="border py-6 hidden lg:block">
              <FilterComponent handleFilter={handleFilter} filters={filters} />
            </div>
            <div className="border lg:col-span-4 border-l">
              <div className=" px-4 pt-4 pb-4 lg:px-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Mobile Phones
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Top picks for you. Updated daily.
                    </p>
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        class="block lg:hidden"
                        variant="outline"
                        size="sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.5em"
                          height="1.5em"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="M18 28h-4a2 2 0 0 1-2-2v-7.59L4.59 11A2 2 0 0 1 4 9.59V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.59a2 2 0 0 1-.59 1.41L20 18.41V26a2 2 0 0 1-2 2M6 6v3.59l8 8V26h4v-8.41l8-8V6Z"
                          />
                        </svg>
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <FilterComponent
                        handleFilter={handleFilter}
                        filters={filters}
                      />
                      <SheetFooter>
                        <SheetClose asChild>
                          {/* <Button type="submit">Close</Button> */}
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
                <Separator className="mb-4 mt-3" />
                <div className="relative">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {products.map((album, index) => (
                      <Link
                        key={album.id}
                        to={`product-detail/${album.id}`}
                        className={cn("space-y-3")}
                      >
                        <div className="rounded-md">
                          <img
                            src={album.thumbnail}
                            // src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80"
                            alt={album.name}
                            width={250}
                            height={330}
                            className={cn(
                              "h-auto w-auto object-cover transition-all hover:scale-105",
                              "aspect-square"
                            )}
                          />
                        </div>
                        <div className="space-y-1 text-sm">
                          <h3 className="font-medium leading-none">
                            {album.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {album.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Pagination className="flex justify-end pt-3">
                    <PaginationContent>
                      <PaginationItem
                        onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                      >
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      {Array.from({ length: totalPages }).map((el, index) => (
                        <PaginationItem
                          onClick={(e) => handlePage(index + 1)}
                          aria-current="page"
                        >
                          {index + 1 === page ? (
                            <PaginationLink isActive>
                              {" "}
                              {index + 1}
                            </PaginationLink>
                          ) : (
                            <PaginationLink> {index + 1}</PaginationLink>
                          )}
                        </PaginationItem>
                      ))}
                      <PaginationItem
                        onClick={(e) =>
                          handlePage(page < totalPages ? page + 1 : page)
                        }
                      >
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;

const FilterComponent = ({ filters, handleFilter }) => {
  const [showSorting, setShowSorting] = useState(true);
  const [showPriceRange, setShowPriceRange] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  return (
    <>
      <div className="px-7">
        <div className="flex justify-between items-center cursor-pointer">
          <h2 className="text-lg font-semibold tracking-tight">Search</h2>
        </div>
        <Input
          type="search"
          className="mt-2"
          placeholder="search product....."
        />
      </div>

      <Separator className="my-4" />
      <div className="px-7">
        <div
          onClick={() => setShowSorting(!showSorting)}
          className="flex justify-between items-center cursor-pointer"
        >
          <h2 className="text-lg font-semibold tracking-tight">Sorting</h2>
          {showSorting ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="m488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872l319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m7 10l5 5l5-5"
              />
            </svg>
          )}
        </div>
        <div
          className={`transition-all duration-200 ease-in-out ${
            showSorting
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="my-2 flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">Prices (Low to High)</span>
          </div>
          <div className="my-2 flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">Prices (High to Low)</span>
          </div>
        </div>
      </div>

      <Separator className="my-4" />
      <div className="px-7">
        <div
          onClick={() => setShowPriceRange(!showPriceRange)}
          className="flex justify-between items-center cursor-pointer"
        >
          <h2 className="text-lg font-semibold tracking-tight">
            SET YOUR PRICE RANGE
          </h2>
          {showPriceRange ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="m488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872l319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m7 10l5 5l5-5"
              />
            </svg>
          )}
        </div>
        <div
          className={`transition-all duration-200 ease-in-out ${
            showPriceRange
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="my-2 flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">Below Rs. 15,000</span>
          </div>
          <div className="my-2 flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">Rs. 15,000 - Rs. 25,000</span>
          </div>
          <div className="my-2 flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">Rs. 25,000 - Rs. 40,000</span>
          </div>
          <div className="my-2 flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">Rs. 40,000 - Rs. 60,000</span>
          </div>
          <div className="my-2 flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">Rs. 60,000 - Rs. 80,000</span>
          </div>
          <div className="my-2 flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">Rs. 80,000 - Rs. 100,000</span>
          </div>
          <div className="my-2 flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">Above 150,000</span>
          </div>
        </div>
      </div>

      <Separator className="my-4" />
      <div className="px-7">
        <div
          onClick={() => setShowBrands(!showBrands)}
          className="flex justify-between items-center cursor-pointer"
        >
          <h2 className="text-lg font-semibold tracking-tight">Brands</h2>
          {showBrands ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="m488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872l319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m7 10l5 5l5-5"
              />
            </svg>
          )}
        </div>
        {filters.map((filter, product) => (
          <div
            className={`transition-all duration-200 ease-in-out ${
              showBrands
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="my-2 flex items-center space-x-2">
              <input type="checkbox" />
              {/* <input
                          id={filter-${section.id}-${optionIdx}}
                          name={${section.id}[]}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          onChange={(e) => handleFilter(e, section, option)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        /> */}
              <span className="text-sm">{filter.label}</span>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />
    </>
  );
};

// import Filters, { useState, Fragment, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchProductsByFiltersAsync,
//   fetchBrandsAsync,
//   fetchCategoriesAsync,
//   selectAllProducts,
//   selectTotalItems,
//   selectBrands,
//   selectCategories,
//   selectProductListStatus,
// } from "./ProductSlice";
// import { ITEMS_PER_PAGE } from "../../app/constants";
// import Pagination from "../../components/Common/Pagination";
// import { FidgetSpinner, Vortex } from "react-loader-spinner";

// import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
// import {
//   FunnelIcon,
//   MinusIcon,
//   PlusIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { Squares2X2Icon } from "@heroicons/react/20/solid";
// import { Link } from "react-router-dom";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// const sortOptions = [
//   {
//     name: "Price: Low to High",
//     sort: "price",
//     order: "asc",
//     current: false,
//   },
//   {
//     name: "Price: High to Low",
//     sort: "price",
//     order: "desc",
//     current: false,
//   },
// ];
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
// export const ProductList = () => {
//   const dispatch = useDispatch();
//   const Status = useSelector(selectProductListStatus);

//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const products = useSelector(selectAllProducts);
//   const brands = useSelector(selectBrands);
//   const categories = useSelector(selectCategories);
//   const filters = [
//     {
//       id: "category",
//       name: "Category",
//       options: categories,
//     },
//     {
//       id: "brand",
//       name: "Brands",
//       options: brands,
//     },
//   ];

//   const totalItems = useSelector(selectTotalItems);
//   const [filter, setFilter] = useState({});
//   const [sort, setSort] = useState({});
//   const [page, setPage] = useState(1);

//   const handleFilter = (e, section, option) => {
//     const newFilter = { ...filter };
//     if (e.target.checked) {
//       if (newFilter[section.id]) {
//         newFilter[section.id].push(option.value);
//       } else {
//         newFilter[section.id] = [option.value];
//       }
//     } else {
//       const index = newFilter[section.id].findIndex(
//         (el) => el === option.value
//       );
//       newFilter[section.id].splice(index, 1);
//     }
//     setFilter(newFilter);
//   };

//   const handleSort = (e, option) => {
//     const sort = { _sort: option.sort, _order: option.order };
//     setSort(sort);
//   };

//   const handlePage = (page) => {
//     setPage(page);
//   };

//   useEffect(() => {
//     const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
//     dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
//   }, [dispatch, filter, sort, page]);

//   useEffect(() => {
//     setPage(1);
//   }, [totalItems, sort]);

//   useEffect(() => {
//     dispatch(fetchBrandsAsync());
//     dispatch(fetchCategoriesAsync());
//   }, []);
//   return (
//     <>
//       <div className="bg-black">
//         <div>
//           {/* Mobile filter dialog */}
//           <MobileFilter
//             filters={filters}
//             handleFilter={handleFilter}
//             mobileFiltersOpen={mobileFiltersOpen}
//             setMobileFiltersOpen={setMobileFiltersOpen}
//           ></MobileFilter>

//           <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-black">
//             <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
//               <h1 className="text-4xl font-bold tracking-tight text-white-900"></h1>

//               <div className="flex items-center bg-black">
//                 <Menu as="div" className="relative inline-block text-left">
//                   <div>
//                     <Menu.Button className="group inline-flex justify-center text-sm font-medium text-white-700 hover:text-white-900">
//                       Sort
//                       <ChevronDownIcon
//                         className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white-400 group-hover:text-white-500"
//                         aria-hidden="true"
//                       />
//                     </Menu.Button>
//                   </div>

//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-black shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
//                       <div className="py-1">
//                         {sortOptions.map((option) => (
//                           <Menu.Item key={option.name}>
//                             {({ active }) => (
//                               <p
//                                 onClick={(e) => handleSort(e, option)}
//                                 className={classNames(
//                                   option.current
//                                     ? "font-medium text-gray-900"
//                                     : "text-gray-400",
//                                   active ? "bg-gray-200" : "",
//                                   "block px-4 py-2 text-sm"
//                                 )}
//                               >
//                                 {option.name}
//                               </p>
//                             )}
//                           </Menu.Item>
//                         ))}
//                       </div>
//                     </Menu.Items>
//                   </Transition>
//                 </Menu>

//                 <button
//                   type="button"
//                   className="-m-2 ml-5 p-2 text-white-400 hover:text-white-500 sm:ml-7 z-1"
//                 >
//                   <span className="sr-only">View grid</span>
//                   <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
//                 </button>
//                 <button
//                   type="button"
//                   className="-m-2 ml-4 p-2 text-white-400 hover:text-white-500 sm:ml-6 lg:hidden"
//                   onClick={() => setMobileFiltersOpen(true)}
//                 >
//                   <span className="sr-only">Filters</span>
//                   <FunnelIcon className="h-5 w-5" aria-hidden="true" />
//                 </button>
//               </div>
//             </div>
//             <section aria-labelledby="products-heading" className="pb-24 pt-6">
//               <h2 id="products-heading" className="sr-only">
//                 Products
//               </h2>
//               <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
//                 {/* DesktopFilter grid */}
//                 <DesktopFilter
//                   handleFilter={handleFilter}
//                   filters={filters}
//                 ></DesktopFilter>
//                 {/* Product grid */}
//                 <div className="lg:col-span-3">
//                   <ProductGrid
//                     products={products}
//                     Status={Status}
//                   ></ProductGrid>
//                 </div>
//                 {/* Product grid end */}
//               </div>
//             </section>
//             {/* section of product and filters ends */}
//             <Pagination
//               filters={filters}
//               page={page}
//               handlePage={handlePage}
//               totalItems={totalItems}
//             ></Pagination>{" "}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// const DesktopFilter = ({ handleFilter, filters }) => {
//   return (
//     <>
//       <form className="hidden lg:block">
//         {filters.map((section) => (
//           <Disclosure
//             as="div"
//             key={section.id}
//             className="border-b border-gray-200 py-6"
//           >
//             {({ open }) => (
//               <>
//                 <h3 className="-my-3 flow-root">
//                   <Disclosure.Button className="flex w-full items-center justify-between bg-black py-3 text-sm text-white-400 hover:text-white-500">
//                     <span className="font-medium text-white-900">
//                       {section.name}
//                     </span>
//                     <span className="ml-6 flex items-center">
//                       {open ? (
//                         <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                       ) : (
//                         <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                       )}
//                     </span>
//                   </Disclosure.Button>
//                 </h3>
//                 <Disclosure.Panel className="pt-6">
//                   <div className="space-y-4">
//                     {section.options.map((option, optionIdx) => (
//                       <div key={option.value} className="flex items-center">
//                         <input
//                           id={`filter-${section.id}-${optionIdx}`}
//                           name={`${section.id}[]`}
//                           defaultValue={option.value}
//                           type="checkbox"
//                           defaultChecked={option.checked}
//                           onChange={(e) => handleFilter(e, section, option)}
//                           className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         />
//                         <label
//                           htmlFor={`filter-${section.id}-${optionIdx}`}
//                           className="ml-3 text-sm text-white-600"
//                         >
//                           {option.label}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </Disclosure.Panel>
//               </>
//             )}
//           </Disclosure>
//         ))}
//       </form>
//     </>
//   );
// };

// const ProductGrid = ({ products, Status }) => {
//   return (
//     <>
//       <div className="bg-black">
//         <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
//           <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
//             {Status === "loading" ? (
//               <Vortex
//                 visible={true}
//                 height="160"
//                 width="160"
//                 ariaLabel="vortex-loading"
//                 wrapperStyle={{}}
//                 wrapperClass="vortex-wrapper"
//                 colors={["red", "green", "blue", "yellow", "orange", "purple"]}
//               />
//             ) : null}
//             {products.map((product) => (
//               <Link to={`/product-detail/${product.id}`} key={product.id}>
//                 <div className="group relative border-solid border-2 p-2 border-gray-600">
//                   <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-600 lg:aspect-none group-hover:opacity-75 lg:h-60">
//                     <img
//                       src={product.thumbnail}
//                       alt={product.title}
//                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                     />
//                   </div>
//                   <div className="mt-4">
//                     <div>
//                       <h3 className="text-medium text-white-700">
//                         <div
//                           className="text-center mb-2"
//                           href={product.thumbnail}
//                         >
//                           <span
//                             aria-hidden="true"
//                             className="absolute inset-0 "
//                           />
//                           {product.title}
//                         </div>
//                       </h3>
//                     </div>
//                     <div>
//                       <p className="text-sm block  font-medium text-white-400 text-center">
//                         ${product.price}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
