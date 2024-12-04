from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
import random

app = FastAPI()

# インスタンスを管理する
instances = {}

class PoemInstance:
    def __init__(self):
        self.queue = random.sample(range(1, 101), 100)
        self.current_index = 0

    def get_next_poem(self):
        if self.current_index >= len(self.queue):
            return None
        poem_id = self.queue[self.current_index]
        self.current_index += 1
        return poem_id


@app.post("/start")
def start_reading():
    instance_id = len(instances) + 1
    instances[instance_id] = PoemInstance()
    return {"instance_id": instance_id}


@app.get("/next/{instance_id}")
def get_next_poem(instance_id: int):
    instance = instances.get(instance_id)
    if not instance:
        raise HTTPException(status_code=404, detail="Instance not found")

    poem_id = instance.get_next_poem()
    if not poem_id:
        return {"message": "No more poems"}

    # poem_idを2桁のゼロ埋めでフォーマット
    formatted_poem_id = str(poem_id).zfill(3)  # 例: 1 -> "001", 11 -> "011"

    poem_text = f"Poem {formatted_poem_id}"  # 実際の句を格納するならここを修正
    audio_file = f"./audio/{formatted_poem_id}.mp3"

    return {
        "poem_text": poem_text,
        "audio_url": f"/audio/{formatted_poem_id}"
    }


@app.get("/audio/{poem_id}")
def get_audio(poem_id: str):
    audio_file = f"./audio/a{poem_id}.mp3"
    return FileResponse(audio_file)
