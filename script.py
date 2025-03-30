import os
import instaloader
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext
import os
import shutil

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

if not TOKEN:
    raise ValueError(
        "Bot token is missing! Set TELEGRAM_BOT_TOKEN environment variable.")


async def start(update: Update, context: CallbackContext):
    await update.message.reply_text(
        "Send me an Instagram video link, and I'll download it for you!")


async def download_instagram_video(update: Update, context: CallbackContext):
    url = update.message.text
    loader = instaloader.Instaloader()

    try:
        shortcode = url.split("/")[-2]  # Extract shortcode from URL
        post = instaloader.Post.from_shortcode(loader.context, shortcode)
        loader.download_post(post, target="downloads")

        video_sent = False
        for file in os.listdir("downloads"):
            if file.endswith(".mp4"):
                await update.message.reply_video(
                    video=open(f"downloads/{file}", "rb"))
                video_sent = True

        # Cleanup: Ensure all files are deleted
        shutil.rmtree("downloads")  # This forcefully deletes the entire folder

        if not video_sent:
            await update.message.reply_text(
                "No video found in the provided link.")

    except Exception as e:
        await update.message.reply_text(f"Error: {e}")


def main():
    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(
        MessageHandler(filters.TEXT & ~filters.COMMAND,
                       download_instagram_video))

    print("Bot is running...")
    app.run_polling()


if __name__ == "__main__":
    main()
