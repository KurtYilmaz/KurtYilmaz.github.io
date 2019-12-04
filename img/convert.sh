#!/bin/bash

for file in png/*.png; do
    filename="$(basename ${file} .png)"
    echo -e "\nfilename = ${filename}\n"
    cwebp -q 80 "$file" -o "webp/${filename}.webp"
done
