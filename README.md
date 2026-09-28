# Hackanow testimonials

A dependency-free implementation of the Hackanow testimonial wall.

The five rows are static inside one wall. That complete wall is duplicated once,
and a single track animation moves both copies together. Hovering any card pauses
that one animation timeline and resumes it from the same position.

## Run locally

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.
