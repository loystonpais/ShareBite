{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    redis
    python3
    python3Packages.fastapi
    python3Packages.redis
    python3Packages.uvicorn
    python3Packages.requests
  ];

  shellHook = ''
  run() {
      redis-server &
      python main.py
  }
  '';

}