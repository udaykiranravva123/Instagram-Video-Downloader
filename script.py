import os
import asyncio
from fastapi import FastAPI
from telegram.ext import Application, CommandHandler, MessageHandler, filters
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

        for item in post.get_sidecar_nodes():
            if item.is_video:
                video_url = item.video_url
                await update.message.reply_video(video=video_url)
                return
        
        await update.message.reply_text("No video found in the provided link.")
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
