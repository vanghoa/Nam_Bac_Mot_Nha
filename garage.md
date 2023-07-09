magick mogrify -resize 1700x> -quality 100 -path out *.jpg

imagemin * --plugin.mozjpeg.progressive=true --plugin.mozjpeg.max=50 --plugin.mozjpeg.stripAll=true --plugin.mozjpeg.size=50 *.jpg --out-dir=./out

magick mogrify -resize 2000x> -quality 100 -path out *.jpg

magick mogrify -format jpg *

magick mogrify -resize 1700x> -quality 100 -path out *.jpg