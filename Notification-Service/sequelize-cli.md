# IMP Commands 
## Initialize
 ```
    sequelize init
 ```

## Create Model
```
    sequelize model:create --name User --attributes firstName:string,lastName:string,email:string
```

## Create Migration
```
    sequelize migration:create --name migration-skeleton
```
## Run Migration
```
    sequelize db:migrate
```
## Undo Migration
```
    sequelize db:migrate:undo
```

## Create Seed
```
    sequelize seed:generate --name demo-user
```

## Run Seed
```
    sequelize db:seed:all
```

## Undo Seed
```
    sequelize db:seed:undo
```

