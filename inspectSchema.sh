#!/bin/bash

curl -XPOST -H 'Content-Type:application/graphql'  -d '{ __schema { types { kind name possibleTypes { name } } } }' http://food.act.today/graphql > App/graphql/schema.json
