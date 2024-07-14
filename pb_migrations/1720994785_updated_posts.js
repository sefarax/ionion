/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oujhpa3t4sxflzh")

  collection.listRule = ""
  collection.createRule = "@request.auth.id != \"\" && created > \"2022-01-01 00:00:00\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oujhpa3t4sxflzh")

  collection.listRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
