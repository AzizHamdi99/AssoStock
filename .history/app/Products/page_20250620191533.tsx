<div className="overflow-x-auto xl:overflow-x-visible xl:mx-32 my-10">
    <h2 className="text-xl font-semibold text-[#5c381b] mb-4">Product List</h2>

    {/* Table Header - visible only on xl+ screens */}
    <div className="hidden xl:grid grid-cols-[0.5fr_0.5fr_1fr_1fr_0.5fr_0.5fr_1fr_1fr] font-bold text-[#a3886d] my-4">
        <p>#</p>
        <p>Image</p>
        <p>Name</p>
        <p>Description</p>
        <p>Price</p>
        <p>Qty</p>
        <p>Category</p>
        <p>Actions</p>
    </div>

    {/* Table Rows */}
    {products?.map((product, index) => {
        const category = categories?.find(cat => cat._id === product.categoryId)

        return (
            <div
                key={product._id}
                className="grid xl:grid-cols-[0.5fr_0.5fr_1fr_1fr_0.5fr_0.5fr_1fr_1fr] xl:items-center gap-y-2 xl:gap-y-0 border-b border-[#f3d3bc] py-3 text-sm text-[#a5886a] font-medium"
            >
                {/* Mobile layout with label */}
                <div className="xl:hidden font-bold text-[#6f4f3a]">#</div>
                <p>{index + 1}</p>

                <div className="xl:hidden font-bold text-[#6f4f3a]">Image</div>
                <Image
                    src={product?.imageUrl || "/empty.webp"}
                    width={40}
                    height={40}
                    alt={product.name}
                    className="rounded-full object-cover w-10 h-10"
                />

                <div className="xl:hidden font-bold text-[#6f4f3a]">Name</div>
                <p>{product.name}</p>

                <div className="xl:hidden font-bold text-[#6f4f3a]">Description</div>
                <p className="truncate">{product.description}</p>

                <div className="xl:hidden font-bold text-[#6f4f3a]">Price</div>
                <p>{product.price} €</p>

                <div className="xl:hidden font-bold text-[#6f4f3a]">Qty</div>
                <p>{product.quantity ?? 0} {product.unit}</p>

                <div className="xl:hidden font-bold text-[#6f4f3a]">Category</div>
                <p>{category?.name || "N/A"}</p>

                <div className="xl:hidden font-bold text-[#6f4f3a]">Actions</div>
                <div className="flex items-center gap-2">
                    <button className="bg-[#fc9c9e] hover:bg-[#f66f75] cursor-pointer text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Pencil size={14} /> Modifier
                    </button>
                    <button className="bg-[#f3e6d4] hover:bg-[#f1d0b5] cursor-pointer text-[#802d32] p-2 rounded">
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        )
    })}
</div>
