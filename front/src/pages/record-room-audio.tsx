import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported = !!navigator.mediaDevices
    && typeof navigator.mediaDevices.getUserMedia == 'function'
    && typeof window.MediaRecorder === 'function';

type AudioRoomParams = {
    roomId: string
}

export function RecordRoomAudio() {
    const params = useParams<AudioRoomParams>()

    const [isRecording, setIsRecording] = useState(false)
    const recorder = useRef<MediaRecorder | null>(null)
    const intervalRef = useRef<NodeJS.Timeout>(null)

    function stopRecording() {
        setIsRecording(false)

        if (recorder.current && recorder.current.state !== 'inactive') {
            recorder.current.stop()
        }

		if (intervalRef.current) {
			clearInterval(intervalRef.current)
		}
    }

    async function uploadAudio(audio: Blob) {
        const formData = new FormData()
        formData.append('file', audio, 'audio.webm')
        const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
            method: 'POST',
            body: formData
        })
        const result = await response.json()
        console.info(result)
    }

    function createRecorder(audio: MediaStream) {
        recorder.current = new MediaRecorder(audio, {
            mimeType: 'audio/webm',
            audioBitsPerSecond: 64000
        })

        recorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                uploadAudio(event.data)
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

        createRecorder(audio)

        intervalRef.current = setInterval(() => {
            recorder.current?.stop()
            createRecorder(audio)
        }, 5000)
    }

    if (!params.roomId) {
        return <Navigate replace to="/" />
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