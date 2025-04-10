FROM rust:latest

RUN dpkg --add-architecture arm64
RUN apt update && apt upgrade -y
RUN apt install -y --no-install-recommends \
                   g++-aarch64-linux-gnu \
                   libc6-dev-arm64-cross \
                   libssl-dev:arm64 \
                   libwebkit2gtk-4.0-dev:arm64 \
                   build-essential \
                   curl:arm64 \
                   wget:arm64 \
                   libgtk-3-dev:arm64 \
                   patchelf:arm64 \
                   librsvg2-dev:arm64 \
                   pkg-config
RUN rustup target add aarch64-unknown-linux-gnu
#RUN rustup toolchain install stable-aarch64-unknown-linux-gnu
RUN cargo install tauri-cli --git https://github.com/tauri-apps/tauri
WORKDIR /app

ENV CARGO_TARGET_AARCH64_UNKNOWN_LINUX_GNU_LINKER=aarch64-linux-gnu-gcc \
    CC_aarch64-unknown-linux-gnu=aarch64-linux-gnu-gcc \
    CXX_aarch64-unknown-linux-gnu=aarch64-linux-gnu-g++ \
    PKG_CONFIG_PATH=/usr/lib/aarch64-linux-gnu/pkgconfig \
    PKG_CONFIG_ALLOW_CROSS=1
WORKDIR /app/src-tauri
CMD ["cargo" ,"tauri",  "build", "--target", "aarch64-unknown-linux-gnu"]