import os
import asyncio
from fastapi import FastAPI
from telegram.ext import Application, CommandHandler, MessageHandler, filters
import requests
import instaloader

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

if not TOKEN:
    raise ValueError("Bot token is missing! Set TELEGRAM_BOT_TOKEN environment variable.")

app = FastAPI()

async def start(update, context):
    await update.message.reply_text("Send me an Instagram video link, and I'll download it for you!")

async def download_instagram_video(update, context):
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

def run_telegram_bot():
    bot = Application.builder().token(TOKEN).build()
    bot.add_handler(CommandHandler("start", start))
    bot.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, download_instagram_video))

    print("Bot is running...")
    bot.run_polling()

# FastAPI endpoint for Render
@app.get("/")
def home():
    return {"message": "Telegram bot is running!"}

# Run bot only when executed directly
if __name__ == "__main__":
    run_telegram_bot()
