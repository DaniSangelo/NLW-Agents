import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const isRecordingSupported = !!navigator.mediaDevices
    && typeof navigator.mediaDevices.getUserMedia == 'function'
    && typeof window.MediaRecorder === 'function';

export function RecordRoomAudio() {
    const [isRecording, setIsRecording] = useState(false)
    const recorder = useRef<MediaRecorder | null>(null)

    function stopRecording() {
        setIsRecording(false)

        if (recorder.current && recorder.current.state !== 'inactive') {
            recorder.current.stop()
            // recorder.current = null
        }
    }

    async function startRecording() {
        if (!isRecordingSupported) {
            alert('Your browser has no support for audio recording')
            return;
        }

        setIsRecording(true);

        const audio = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44100
            }
        })

        recorder.current = new MediaRecorder(audio, {
            mimeType: 'audio/webm',
            audioBitsPerSecond: 64000
        })

        recorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                console.info(event.data)
            }
        }

        recorder.current.onstart = () => {
            console.info('recording started')
        }

        recorder.current.onstop = () => {
            console.info('Recording stoped')
        }

        recorder.current.start()
    }

    return (
        <div className="h-screen flex items-center justify-center gap-3 flex-col">
            {isRecording ? (
                <Button onClick={stopRecording}>Stop recording</Button>
            ) : (
                <Button onClick={startRecording}>Record audio</Button>
            )}
        </div>
    )
}