import { Button } from "@/components/ui/button";

export function RecordRoomAudio() {
    return (
        <div className="h-screen flex items-center justify-center gap-3 flex-col">
            <Button>Record audio</Button>
            <p>Recording...</p>
        </div>
    )
}