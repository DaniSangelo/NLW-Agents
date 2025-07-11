import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { dayjs } from '@/lib/format-relative-date'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type GetRoomsAPIResponse = Array<{
    id: string
    name: string,
    totalQuestions: number,
    createdAt: string
}>

export function CreateRoom() {
    const {data, isLoading} = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async() => {
            const response = await fetch('http://localhost:3333/rooms')
            const result: GetRoomsAPIResponse = await response.json()

            return result
        }
    })

    return (
    <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-4xl">
            <div className='grid grid-cols-2 items-start gap-8'>
                <div/>
                <Card>
                    <CardHeader>
                        <CardTitle> Rooms recently created </CardTitle>
                        <CardDescription> Quickly access to the recent created rooms </CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-3'>
                        {isLoading && <p className='text-mutted-foreground text-sm'> Loading rooms...</p>}
                        {
                            data?.map(room => {
                                return (
                                    <Link key={room.id} className='flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50' to={`rooms/${room.id}`}>
                                        <div className='flex-1 flex flex-col gap-1'>
                                            <h3 className='font-medium'>
                                                {room.name}
                                            </h3>
                                            <div className='flex items-center gap-2'>
                                                <Badge variant="secondary" className='text-xs'>
                                                    {dayjs(room.createdAt).toNow()}
                                                </Badge>
                                                <Badge variant="secondary" className='text-xs'>{room.totalQuestions} questions</Badge>
                                            </div>
                                        </div>
                                        <span className='flex items-center gap-1 text-sm'>
                                            Entrar
                                            <ArrowRight className='size-3'/>
                                        </span>
                                    </Link>
                                )
                            })
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
    )
}