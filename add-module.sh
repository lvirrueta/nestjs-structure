#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Especifica el nombre del modulo"
    exit 1
fi
module=$1;

mkdir -p src/$module/app/controllers
mkdir -p src/$module/app/dto
mkdir -p src/$module/app/swagger

mkdir -p src/$module/domain/interface
mkdir -p src/$module/domain/irepositories
mkdir -p src/$module/domain/service

mkdir -p src/$module/infrastructure/entities
mkdir -p src/$module/infrastructure/repositories

nest g mo $module
nest g co $module/app/controllers/$module --flat --no-spec
nest g cl $module/app/dto/create-$module.dto --flat --no-spec
nest g cl $module/app/dto/update-$module.dto --flat --no-spec
nest g cl $module/app/swagger/api-$module --flat --no-spec
nest g s $module/domain/service/$module --flat --no-spec
nest g itf $module/domain/interface/i-$module --flat --no-spec
nest g itf $module/domain/irepositories/i-$module.repository --flat --no-spec
nest g cl $module/infrastructure/entities/$module.entity --flat --no-spec
nest g pr $module/infrastructure/repositories/$module.repository --flat --no-spec
