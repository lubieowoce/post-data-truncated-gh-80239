#!/usr/bin/env bash

# create a 60MB file full of zeros
file_size_bytes=$((60 * 1024 * 1024))
temp_file=$(mktemp);
dd if=/dev/zero of="$temp_file" bs="$file_size_bytes" count=1 2>/dev/null;

echo "posting file:"
du -h "$temp_file";

received_length="$(curl -s -H "Content-Type: text/plain" --data-binary "@${temp_file}" 'http://localhost:3000/post-handler')"
if [ "$file_size_bytes" = "$received_length" ]; then
  echo "OK: sent and received the same amount of bytes"
else
  echo "MISMATCH: sent $file_size_bytes, received $received_length"
fi
