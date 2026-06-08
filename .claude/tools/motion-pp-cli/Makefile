.PHONY: build test lint install clean

build:
	go build -o bin/motion-pp-cli ./cmd/motion-pp-cli

test:
	go test ./...

lint:
	golangci-lint run

install:
	go install ./cmd/motion-pp-cli

clean:
	rm -rf bin/

build-mcp:
	go build -o bin/motion-pp-mcp ./cmd/motion-pp-mcp

install-mcp:
	go install ./cmd/motion-pp-mcp

build-all: build build-mcp
