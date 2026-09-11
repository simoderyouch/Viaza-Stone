'use client'

import { useMemo, useState } from 'react'
import { CustomSelect } from '@/components/custom-select'
import { ProductCard } from '@/components/product-card'
import { collectionPages, getAvailableCatalogueCategories, matchesCollectionProduct, type ProductType } from '@/data/collections'
import type { Product } from '@/data/products'

export function CatalogueBrowser({
  products,
  initialMaterial = 'All',
  initialType = 'All',
  initialQuery = '',
}: {
  products: Product[]
  initialMaterial?: string
  initialType?: string
  initialQuery?: string
}) {
  const availableCategories = useMemo(() => getAvailableCatalogueCategories(products), [products])
  const productTypes: Array<'All' | ProductType> = ['All', ...availableCategories.map((category) => category.value)]
  const validInitialType = productTypes.includes(initialType as ProductType) ? initialType as (typeof productTypes)[number] : 'All'
  const validInitialMaterial = ['All', ...products.map((product) => product.material)].includes(initialMaterial) ? initialMaterial : 'All'
  const [selectedType, setSelectedType] = useState<(typeof productTypes)[number]>(validInitialType)
  const [selectedMaterial, setSelectedMaterial] = useState(validInitialMaterial)
  const [selectedCollection, setSelectedCollection] = useState('All')
  const [selectedColor, setSelectedColor] = useState('All')
  const [selectedFinish, setSelectedFinish] = useState('All')
  const [selectedApplication, setSelectedApplication] = useState('All')
  const [query, setQuery] = useState(initialQuery)

  const materials = useMemo(
    () => ['All', ...Array.from(new Set(products.map((product) => product.material)))],
    [products],
  )
  const availableCollections = useMemo(
    () => collectionPages.filter((collection) => products.some((product) => matchesCollectionProduct(collection, product))),
    [products],
  )
  const colors = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.color)))], [products])
  const finishes = useMemo(() => ['All', ...Array.from(new Set(products.flatMap((product) => product.finishes)))], [products])
  const applications = useMemo(() => ['All', ...Array.from(new Set(products.flatMap((product) => product.applications)))], [products])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return products.filter((product) => {
      const matchingType = selectedType === 'All' || product.type === selectedType
      const matchingMaterial = selectedMaterial === 'All' || product.material === selectedMaterial
      const collection = collectionPages.find((item) => item.slug === selectedCollection)
      const matchingCollection = selectedCollection === 'All' || Boolean(collection && matchesCollectionProduct(collection, product))
      const matchingColor = selectedColor === 'All' || product.color === selectedColor
      const matchingFinish = selectedFinish === 'All' || product.finishes.includes(selectedFinish)
      const matchingApplication = selectedApplication === 'All' || product.applications.includes(selectedApplication)
      const matchingQuery =
        !normalizedQuery ||
        [product.name, product.material, product.color, product.origin, ...product.finishes, ...product.applications]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      return matchingType && matchingMaterial && matchingCollection && matchingColor && matchingFinish && matchingApplication && matchingQuery
    })
  }, [products, query, selectedApplication, selectedCollection, selectedColor, selectedFinish, selectedMaterial, selectedType])

  const hasActiveFilters = selectedType !== 'All' || selectedMaterial !== 'All' || selectedCollection !== 'All' || selectedColor !== 'All' || selectedFinish !== 'All' || selectedApplication !== 'All' || Boolean(query)

  return (
    <div>
      <div className="sticky top-20 z-20 grid gap-4 border-y border-stone-200 bg-[#f7f5f0]/95 py-5 backdrop-blur md:grid-cols-2 xl:top-24 xl:grid-cols-4">
        <div className="block">
          <span className="mb-2 block text-[0.65rem] font-bold tracking-[0.14em] text-stone-600 uppercase">Product type</span>
          <CustomSelect
            value={selectedType}
            onChange={(value) => setSelectedType(value as (typeof productTypes)[number])}
            options={[
              { value: 'All', label: 'All product types' },
              ...availableCategories.map((category) => ({ value: category.value, label: category.label })),
            ]}
          />
        </div>
        <div className="block">
          <span className="mb-2 block text-[0.65rem] font-bold tracking-[0.14em] text-stone-600 uppercase">Collection</span>
          <CustomSelect
            value={selectedCollection}
            onChange={setSelectedCollection}
            options={[
              { value: 'All', label: 'All collections' },
              ...availableCollections.map((collection) => ({ value: collection.slug, label: collection.title })),
            ]}
          />
        </div>
        <div className="block">
          <span className="mb-2 block text-[0.65rem] font-bold tracking-[0.14em] text-stone-600 uppercase">Material</span>
          <CustomSelect
            value={selectedMaterial}
            onChange={setSelectedMaterial}
            options={materials.map((material) => ({ value: material, label: material }))}
          />
        </div>
        <div className="block">
          <span className="mb-2 block text-[0.65rem] font-bold tracking-[0.14em] text-stone-600 uppercase">Colour</span>
          <CustomSelect value={selectedColor} onChange={setSelectedColor} options={colors.map((color) => ({ value: color, label: color === 'All' ? 'All colours' : color }))} />
        </div>
        <div className="block">
          <span className="mb-2 block text-[0.65rem] font-bold tracking-[0.14em] text-stone-600 uppercase">Finish</span>
          <CustomSelect value={selectedFinish} onChange={setSelectedFinish} options={finishes.map((finish) => ({ value: finish, label: finish === 'All' ? 'All finishes' : finish }))} />
        </div>
        <div className="block">
          <span className="mb-2 block text-[0.65rem] font-bold tracking-[0.14em] text-stone-600 uppercase">Application</span>
          <CustomSelect value={selectedApplication} onChange={setSelectedApplication} options={applications.map((application) => ({ value: application, label: application === 'All' ? 'All applications' : application }))} />
        </div>
        <label className="block xl:col-span-2">
          <span className="mb-2 block text-[0.65rem] font-bold tracking-[0.14em] text-stone-600 uppercase">Search catalogue</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a color, material, or product"
            className="min-h-12 w-full border border-stone-300 bg-[#f7f5f0] px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 transition hover:border-[#282828] focus:border-[#282828]"
          />
        </label>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="text-sm text-stone-600">
          Showing <strong className="text-[#292b2c]">{filteredProducts.length}</strong> of {products.length} surfaces
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSelectedType('All')
              setSelectedMaterial('All')
              setSelectedCollection('All')
              setSelectedColor('All')
              setSelectedFinish('All')
              setSelectedApplication('All')
              setQuery('')
            }}
            className="border border-stone-300 px-2.5 py-1 text-[0.56rem] font-bold tracking-[0.12em] text-[#282828] uppercase transition hover:border-[#282828] hover:bg-[#f7f5f0]"
          >
            Reset filters
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      ) : (
        <div className="mt-7 border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
          <p className="font-display text-2xl">No surfaces match those filters.</p>
          <p className="mt-2 text-sm text-stone-600">Try another material, product type, or search term.</p>
        </div>
      )}
    </div>
  )
}
