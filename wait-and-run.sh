#!/bin/sh

# Check if the container name is provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <container_name>"
  exit 1
fi

container_name=$1

# Wait for the specified container to exit
while [ "$(docker inspect -f '{{.State.Running}}' "$container_name" 2>/dev/null)" == "true" ]; do
  sleep 1
done

# Run the main command
shift  # Remove the first argument (container_name)
exec "$@"