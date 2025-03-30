import os
import instaloader
import requests
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext
from fastapi import FastAPI
import uvicorn

# Load bot token from environment variables
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

if not TOKEN:
    raise ValueError("Bot token is missing! Set TELEGRAM_BOT_TOKEN environment variable.")

# Initialize FastAPI app
app = FastAPI()

# Telegram bot setup
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Send me an Instagram video link, and I'll download it for you!")

async def download_instagram_video(update: Update, context: CallbackContext):
    url = update.message.text
    loader = instaloader.Instaloader()

    try:
        shortcode = url.split("/")[-2]  # Extract shortcode from URL
        post = instaloader.Post.from_shortcode(loader.context, shortcode)

        if not post.is_video:
            await update.message.reply_text("This post does not contain a video.")
            return

        video_url = post.video_url  # Get the direct video URL
        response = requests.get(video_url, stream=True)

        if response.status_code == 200:
            await update.message.reply_video(video=response.content)
        else:
            await update.message.reply_text("Failed to download the video.")

    except Exception as e:
        await update.message.reply_text(f"Error: {e}")

def run_bot():
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, download_instagram_video))

    loop = asyncio.new_event_loop()  # ✅ Fix: Create a new event loop
    asyncio.set_event_loop(loop)
    loop.run_until_complete(app.run_polling())

# Web route to make Render detect a web service
@app.get("/")
def home():
    return {"status": "Bot is running!"}

# Start bot in background
if __name__ == "__main__":
    from threading import Thread
    Thread(target=run_bot).start()
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
