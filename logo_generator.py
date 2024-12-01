from PIL import Image, ImageDraw, ImageFont

# Create a sample logo
width, height = 300, 100
background_color = (51, 51, 51)
text_color = (255, 255, 255)

# Create the image
logo = Image.new("RGB", (width, height), color=background_color)
draw = ImageDraw.Draw(logo)

# Add text
text = "AI Courses"
font_size = 36

try:
    font = ImageFont.truetype("arial.ttf", font_size)
except IOError:
    font = ImageFont.load_default()

text_width, text_height = draw.textsize(text, font=font)
text_position = ((width - text_width) // 2, (height - text_height) // 2)
draw.text(text_position, text, fill=text_color, font=font)

# Save the logo
logo.save("/projects/ai-courses-website/frontend/public/ai_courses_logo.png")
