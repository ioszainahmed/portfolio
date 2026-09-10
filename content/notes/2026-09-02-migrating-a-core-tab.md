---
title: Migrating a core tab
date: 2026-09-02
slug: migrating-a-core-tab
description: Replacing a legacy tab in a shipping app, one screen at a time, without a rewrite anyone had to approve.
---

Nobody signs off on a rewrite. What they sign off on is a feature, and the
migration rides along underneath it. A tab that has been in the app since
Objective-C was the only option is not going to be replaced in a quarter, and
proposing that is the fastest way to have the idea rejected on cost.

## Start at the leaves

The instinct is to rebuild the container first — the tab, the navigation, the
coordinator — and fill it in. That is the version that stalls, because nothing
ships until all of it works, and the branch ages badly against a codebase
twenty other people are changing.

Going the other way works better: replace the smallest leaf screen, ship it,
then the next one. Each step is a normal feature-sized change that a reviewer
can hold in their head.

- Every step is independently shippable, so the work survives a reprioritisation.
- Bugs are attributable. When something regresses you know which screen did it.
- The container is migrated last, by which point it barely does anything.

### The seam is the hard part

Hosting a SwiftUI view inside a UIKit stack is trivial. Keeping two navigation
models honest about who owns the back button is not:

```swift
final class LegacyHost: UIHostingController<DetailView> {
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        // The UIKit parent still owns the chrome until the whole tab moves.
        navigationController?.setNavigationBarHidden(false, animated: animated)
    }
}
```

That line is the entire migration in miniature. Two systems, one of which
thinks it is in charge, and a boundary you have to keep explicit until the
older one is gone.

## What actually slows you down

Not the UI. The UI is the part with a clear finish line. The slow parts are
the analytics events that fired from `viewDidAppear` and now need somewhere
honest to live, the A/B assignment read at a point in the lifecycle SwiftUI
does not have, and the deep links that pointed at a view controller by name.

> The old code is not badly written. It is written against assumptions that
> stopped being true, and it never got told.

## Knowing when to stop

The goal was never a SwiftUI app. It was a tab that a new engineer can change
without reading five years of history first. Some of the old code clears that
bar already, and rewriting it buys nothing but risk. Leave it.
