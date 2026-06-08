.PHONY: build test lint install clean

build:
	go build -o bin/clickup-pp-cli-pp-cli ./cmd/clickup-pp-cli-pp-cli

test:
	go test ./...

lint:
	golangci-lint run

install:
	go install ./cmd/clickup-pp-cli-pp-cli

clean:
	rm -rf bin/

build-mcp:
	go build -o bin/clickup-pp-cli-pp-mcp ./cmd/clickup-pp-cli-pp-mcp

install-mcp:
	go install ./cmd/clickup-pp-cli-pp-mcp

build-all: build build-mcp
