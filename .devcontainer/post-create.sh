#!/usr/bin/env bash

set -e

gh auth login

./.devcontainer/shortcuts/sync-env.sh

echo "export PATH=$PWD/.devcontainer/shortcuts:$PATH" >> ~/.bashrc
