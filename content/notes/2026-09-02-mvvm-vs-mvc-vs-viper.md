---
title: MVVM vs MVC vs VIPER
date: 2026-09-02
slug: mvvm-vs-mvc-vs-viper
description: Placeholder. The architecture argument is mostly an argument about where you are willing to put the mess.
---

*Placeholder text. Replace the body of this file with the real article; the
front matter above drives the title, the URL, the widget row and the feed.*

Nobody picks an architecture because it is correct. They pick it because of
where it lets them put the parts of the app that refuse to be tidy — and every
one of these patterns has a designated room for the mess.

## The three, briefly

**MVC** as Apple shipped it puts the mess in the view controller. That is not a
flaw in the pattern so much as a flaw in the name: the controller is a view
layer, so anything that touches both the view and the model lands there and
stays.

**MVVM** moves it one hop out. The view model is testable, which is the real
win, and it is also where every piece of formatting, coordination and
half-business-logic will accumulate unless someone is watching.

**VIPER** splits the room into five smaller rooms. On a large team with a large
app that is a genuine gain, because the seams are where the ownership
boundaries are. On a screen with a title and a button it is ceremony.

## What actually decides it

1. How many people touch this screen in a sprint.
2. Whether navigation is a property of the screen or of the flow.
3. How much of the logic you need to test without a simulator.

The third one does most of the work. If the answer is *most of it*, you want a
layer that does not import `UIKit`, and the name you give that layer matters
much less than the fact that it exists.

```swift
@MainActor
final class ReservationViewModel: ObservableObject {
    @Published private(set) var state: LoadState<[Reservation]> = .idle

    func load() async {
        state = .loading
        do { state = .loaded(try await service.reservations()) }
        catch { state = .failed(error) }
    }
}
```

That is MVVM by most definitions, and it would be a presenter under VIPER, and
it would live in a controller extension under MVC. The testability is a
property of the boundary, not of the acronym.

> Pick the smallest structure that still puts the untestable parts on one side
> of a line you can draw.

See also [Thinking in systems](../thinking-in-systems/).
