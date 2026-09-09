---
title: Swift concurrency
date: 2026-08-27
slug: swift-concurrency
description: Placeholder. Actors do not remove the concurrency problem, they move it to the boundary where you can see it.
---

*Placeholder text. Replace the body of this file with the real article; the
front matter above drives the title, the URL, the widget row and the feed.*

The pitch for `async/await` is that it makes concurrent code read like
sequential code. That is true and it is also the trap: it reads sequentially,
so it is easy to stop noticing the suspension points, which are the only places
anything interesting can go wrong.

## Suspension points are the API

Every `await` is a place where the world can change underneath you. State you
read before it may not hold after it.

```swift
func refresh() async {
    let stale = cache.snapshot()
    let fresh = try? await service.fetch()   // anything can happen here
    apply(fresh ?? stale)                     // is `stale` still current?
}
```

Actors fix the data race and not the logic race. Serialised access means two
tasks will not corrupt the same field; it does not mean the second one is still
doing something that makes sense.

## Things worth being deliberate about

- `@MainActor` on the type, not scattered across its methods.
- Structured tasks over detached ones — cancellation should follow the tree.
- `Sendable` warnings are the compiler telling you where the boundary is. Do
  not silence them; move the boundary.

More once this is written properly.
