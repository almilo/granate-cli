# granate-cli

[![npm version](https://badge.fury.io/js/granate-cli.svg)](https://badge.fury.io/js/granate-cli)
[![Build Status](https://travis-ci.org/almilo/granate-cli.svg?branch=master)](https://travis-ci.org/almilo/granate-cli)

CLI for [granate](https://github.com/almilo/granate)

## Introduction
**granate-cli** provides several useful commands to use [granate](https://github.com/almilo/granate) from the command
line.

## Commands

### serve
Starts an HTTP GraphQL server with the given schema.

```
> granate serve schema.graphql --port 4000 --graphiql true
```

```
granate serve [schema-file]

Options:
  --port, -p      the server port                       [number] [default: 4000]
  --graphiql, -g  deploy GraphiQL               [boolean] [default: true]

```

## Usage
For more information see [granate-showcase](https://github.com/almilo/granate-showcase).
