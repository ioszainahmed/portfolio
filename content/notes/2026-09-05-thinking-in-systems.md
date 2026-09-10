---
title: Thinking in systems
date: 2026-09-05
slug: thinking-in-systems
description: Chessboards, codebases and coalitions turn out to be the same problem wearing different clothes.
---

A chessboard is a system with perfect information and no ambiguity about the
rules, and it is still hard. A codebase is a system with none of that. What
carries over is not tactics but the habit of asking what a move does to the
position two moves from now.

## What a system asks of you

The interesting question in a codebase is rarely *does this work*. It is
**what does this make easy, and what does it quietly make expensive**. A
function that saves four lines today and forces every future caller to
remember an ordering constraint has not saved anything.

Three things I keep coming back to:

- The shape of the data decides the shape of the code. Change the model and
  half the awkward call sites stop being awkward.
- Every abstraction is a bet about which direction the requirements will move.
  Some bets are cheap to lose; take those.
- Coupling you can see is better than coupling you cannot. An explicit
  dependency is a design decision; an implicit one is a trap for whoever comes
  next.

### A small example

The version that reads best is usually the one where the types make the
invalid state impossible to write down:

```swift
enum LoadState<Value> {
    case idle
    case loading
    case loaded(Value)
    case failed(Error)
}
```

Two booleans and an optional describe the same four states, plus twelve that
should never exist. You will spend the life of the feature defending against
those twelve.

> The purpose of a system is what it does, not what it was intended to do.

## Where it stops working

The analogy has a limit. Chess ends. Software does not, and the position you
are optimising for is one you will still be sitting in three years from now
with a different team. That changes what counts as a good move: legibility
starts to beat cleverness by a wide margin.

More on this in [Migrating a core tab](../migrating-a-core-tab/), which is the
same argument applied to something narrower.
