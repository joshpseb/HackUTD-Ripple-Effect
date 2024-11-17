"use client"
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { use, useState } from 'react'
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

type Props = {
    params: Promise<{
        slug: string
    }>
}

export const data: Car[] = [
    {
        model: "Camry",
        year: 2022,
        rating: 4.5,
        cityMpg: 28,
        highwayMpg: 39,
    },
    {
        model: "Accord",
        year: 2021,
        rating: 3,
        cityMpg: 28,
        highwayMpg: 39,
    },
    {
        model: "Fusion",
        year: 2020,
        rating: 2.5,
        cityMpg: 28,
        highwayMpg: 39,
    },
    {
        model: "Malibu",
        year: 2019,
        rating: 4,
        cityMpg: 28,
        highwayMpg: 39,
    },
    {
        model: "Camry",
        year: 2022,
        rating: 4.5,
        cityMpg: 28,
        highwayMpg: 39,
    },
    {
        model: "Accord",
        year: 2021,
        rating: 3,
        cityMpg: 28,
        highwayMpg: 39,
    },
    {
        model: "Fusion",
        year: 2020,
        rating: 2.5,
        cityMpg: 28,
        highwayMpg: 39,
    },
    {
        model: "Malibu",
        year: 2019,
        rating: 4,
        cityMpg: 28,
        highwayMpg: 39,
    }, {
        model: "Camry",
        year: 2022,
        rating: 4.5,
        cityMpg: 28,
        highwayMpg: 39,
    },
    {
        model: "Accord",
        year: 2021,
        rating: 3,
        cityMpg: 28,
        highwayMpg: 39,
    },
    {
        model: "Fusion",
        year: 2020,
        rating: 2.5,
        cityMpg: 28,
        highwayMpg: 39,
    },
    {
        model: "Malibu",
        year: 2019,
        rating: 4,
        cityMpg: 28,
        highwayMpg: 39,
    }
]


export default function Page({ params }: Props) {
    const { slug } = use(params)
    const [inputValue, setInputValue] = useState(slug)

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [rowSelection, setRowSelection] = React.useState({})

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})



    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: (updater) => {
            // If it's a function updater
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
                // If it's a direct value update
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
                    <DataTable columns={columns} data={data} table={table} />
                </div>
                <div className='col-span-3'>
                    <Chart chartData={table.getRowModel().rows.filter(row => row.getIsSelected()).map(row => row.original)} />
                </div>
            </main>
        </div>
    )
}
