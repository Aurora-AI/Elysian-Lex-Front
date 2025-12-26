from fastapi import FastAPI

app = FastAPI(title="Elysian Lex Engine")


@app.get("/")
def read_root():
    return {
        "system": "Elysian Lex",
        "status": "Online",
        "sovereignty": "Active",
        "mode": "War Mode",
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}
