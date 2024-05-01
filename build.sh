#!/usr/bin/env bash

dirs=("todo-react" "todo-solid" "todo-vanilla" "todo-vue")

for dir in "${dirs[@]}"; do
  cd $dir
  pnpm install
  cd -
done
