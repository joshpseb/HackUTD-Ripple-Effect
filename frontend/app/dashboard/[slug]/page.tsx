"use client"
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    SortingState,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,


} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Car, columns } from './columns'
import { DataTable } from './data-table'
import Chart from './chart'
import { toast } from 'sonner'

type Props = {
    params: Promise<{
        slug: string
    }>
}

const URL = "http://localhost:3002"
const PATH = "api/vehicles"


export default function Page({ params }: Props) {
    const { slug } = use(params)
    const [inputValue, setInputValue] = useState<string>()
    const [fetchedData, setFetchedData] = useState<Car[] | undefined | any>(undefined)

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [rowSelection, setRowSelection] = React.useState({})

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})



    const table = useReactTable({
        data: fetchedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: (updater) => {
            if (typeof updater === 'function') {
                setRowSelection((prev) => {
                    const next = updater(prev)
                    const selectedCount = Object.keys(next).length

                    if (selectedCount <= 2) {
                        return next
                    }
                    return prev
                })
            } else {
                const selectedCount = Object.keys(updater).length
                if (selectedCount <= 2) {
                    setRowSelection(updater)
                }
            }
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    useEffect(() => {
        setInputValue(slug)
        toast.loading("Fetching event.", { id: "fetching" })
        fetch(`${URL}/${PATH}/${slug.toUpperCase()}`, { // localhost:3002/api/vehicles/TOYOTA
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json(); // Read and parse the JSON body
            })
            .then((data) => {
                console.log(data);
                let i = 0;
                setFetchedData(data.map((line: any) => {
                    return {
                        model: line.model + "_" + i++,
                        year: line.year,
                        rating: Math.floor(Math.random() * 5) + 1,
                        cityMpg: line.cityFE,
                        highwayMpg: line.highwayFE,
                        transmission: line.transmission,
                        manufacturer: line.manufacturer,
                    }
                }));


                toast.success("Event has been fetched.", { id: "fetching" });
            })

            .catch((error) => {
                console.log(error)
                toast.error("Failed to fetch event.", { id: "fetching" })
                // toast.success("Event has been created.", { id: "fetching" })
                setFetchedData([])
            })
    }, [])

    if (fetchedData === undefined) {
        return <div>Loading...</div>
    }

    return (
        <div className='w-screen min-h-screen flex flex-col items-center p-8'>
            <nav className="w-96 flex gap-6">
                <Input placeholder="Toyota" value={inputValue} onChange={(event) => {
                    setInputValue(event.target.value)
                }} />
                <Link href={`/dashboard/${inputValue}`} className={buttonVariants()}>Go</Link>
            </nav>
            <main className="p-4 w-full grid grid-cols-5 gap-6">
                <div className='col-span-2'>
                    <DataTable columns={columns} data={fetchedData} table={table} />
                </div>

                <div className='col-span-3 grid grid-flow-row grid-rows-2 gap-4 border p-4'>
                    <Chart chartData={table.getRowModel().rows.filter(row => row.getIsSelected()).map(row => row.original)} />
                    <div className='space-y-2'>
                        <h2 className='text-lg'>Selected Rows:</h2>
                        <div className="flex flex-col gap-4 pl-4">
                            {table.getRowModel().rows
                                .filter(row => row.getIsSelected())
                                .map((row, index) => (
                                    <div
                                        key={index}
                                        className={`flex gap-2 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow ${'flex-grow'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-xl">{row.original.model}</span>
                                            <span className="text-sm text-gray-500">({row.original.year})</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                            <p><span className="font-medium">Rating:</span> {row.original.rating}</p>
                                            <p><span className="font-medium">City MPG:</span> {row.original.cityMpg}</p>
                                            <p><span className="font-medium">Highway MPG:</span> {row.original.highwayMpg}</p>
                                            <p><span className="font-medium">Transmission:</span> {row.original.transmission}</p>
                                            <p><span className="font-medium">Manufacturer:</span> {row.original.manufacturer}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </main >
        </div >
    )
}
