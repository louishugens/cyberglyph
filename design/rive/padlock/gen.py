"""Generate scene.rml for the CyberGlyph zero-trust padlock.

View model `Padlock.decision` (number) drives the state machine:
  0 = neutral, 1 = allow, 2 = step-up, 3 = deny

Every decision animation keys the same property set, so the 200ms state
blends mix cleanly in any direction. Run: python3 gen.py && rive . --verify
"""

from itertools import count

_ids = count(10)


def nid():
    return f"0:{next(_ids)}"


# ---------------------------------------------------------------- palette
BLUE = "FF4F86FF"
GREEN = "FF3DD68C"
AMBER = "FFF0B340"
RED = "FFFF6B6B"
STEEL = "FFC9D2E3"
BODY = "FF1A2030"
BODY_EDGE = "FF2F3A55"


def glow(c):  # radial glow centre: same hue, low alpha
    return "5C" + c[2:]


# ---------------------------------------------------------------- ids
AB, SM, VM, VMI, P_DECISION = nid(), nid(), nid(), nid(), nid()
LOCK, BODY_SHAPE = nid(), nid()
KEYHOLE, KEYHOLE_COLOR = nid(), nid()
RING, RING_COLOR = nid(), nid()
SHACKLE = nid()
GLOW, GLOW_STOP = nid(), nid()

EASE_OUT = '<CubicEaseInterpolator x1="0.23" y1="1" x2="0.32" y2="1"/>'
EASE_IN_OUT = '<CubicEaseInterpolator x1="0.77" y1="0" x2="0.175" y2="1"/>'


def kf(kind, value, frame, interp="linear", curve=None):
    if curve:
        return (f'<KeyFrame{kind} value="{value}" frame="{frame}" interpolationType="cubic">'
                f"{curve}</KeyFrame{kind}>")
    return f'<KeyFrame{kind} value="{value}" frame="{frame}" interpolationType="{interp}"/>'


def keyed(obj, prop, frames):
    return (f'<KeyedObject objectId="{obj}"><KeyedProperty propertyKey="{prop}">'
            + "".join(frames) + "</KeyedProperty></KeyedObject>")


def hold_color(obj, key, c):
    return keyed(obj, key, [kf("Color", c, 0, "hold")])


def hold(obj, key, v):
    return keyed(obj, key, [kf("Double", v, 0, "hold")])


def animation(name, anim_id, duration, loop, tracks):
    return (f'<LinearAnimation loopValue="{loop}" duration="{duration}" name="{name}" id="{anim_id}">'
            + "".join(tracks) + "</LinearAnimation>")


def palette_tracks(c):
    return [
        hold_color(KEYHOLE_COLOR, 37, c),
        hold_color(RING_COLOR, 37, c),
        hold_color(GLOW_STOP, 38, glow(c)),
    ]


A_NEUTRAL, A_ALLOW, A_STEPUP, A_DENY, A_AMBIENT = nid(), nid(), nid(), nid(), nid()

anims = [
    animation("Neutral", A_NEUTRAL, 1, "oneShot", palette_tracks(BLUE) + [
        hold(SHACKLE, 14, -42), hold(LOCK, 13, 120),
        hold(RING, 16, 1), hold(RING, 17, 1), hold(RING, 18, 0.55),
    ]),
    # Shackle springs up out of the body; ring flashes outward and settles.
    animation("Allow", A_ALLOW, 42, "oneShot", palette_tracks(GREEN) + [
        keyed(SHACKLE, 14, [kf("Double", -42, 0, curve=EASE_OUT), kf("Double", -60, 20)]),
        hold(LOCK, 13, 120),
        keyed(RING, 16, [kf("Double", 1, 0, curve=EASE_OUT), kf("Double", 1.22, 12, curve=EASE_OUT), kf("Double", 1, 36)]),
        keyed(RING, 17, [kf("Double", 1, 0, curve=EASE_OUT), kf("Double", 1.22, 12, curve=EASE_OUT), kf("Double", 1, 36)]),
        keyed(RING, 18, [kf("Double", 0.55, 0, curve=EASE_OUT), kf("Double", 1, 10, curve=EASE_OUT), kf("Double", 0.7, 36)]),
    ]),
    # Held closed while the challenge pulses: a seamless loop.
    animation("StepUp", A_STEPUP, 72, "loop", palette_tracks(AMBER) + [
        hold(SHACKLE, 14, -42), hold(LOCK, 13, 120),
        keyed(RING, 16, [kf("Double", 1, 0, curve=EASE_IN_OUT), kf("Double", 1.14, 36, curve=EASE_IN_OUT), kf("Double", 1, 72)]),
        keyed(RING, 17, [kf("Double", 1, 0, curve=EASE_IN_OUT), kf("Double", 1.14, 36, curve=EASE_IN_OUT), kf("Double", 1, 72)]),
        keyed(RING, 18, [kf("Double", 0.45, 0, curve=EASE_IN_OUT), kf("Double", 1, 36, curve=EASE_IN_OUT), kf("Double", 0.45, 72)]),
    ]),
    # Hard no: the whole lock shakes and the ring contracts.
    animation("Deny", A_DENY, 48, "oneShot", palette_tracks(RED) + [
        hold(SHACKLE, 14, -42),
        keyed(LOCK, 13, [kf("Double", v, f) for v, f in
                         [(120, 0), (120, 10), (110, 14), (130, 18), (112, 22), (128, 26), (115, 30), (125, 34), (120, 40)]]),
        keyed(RING, 16, [kf("Double", 1, 0, curve=EASE_OUT), kf("Double", 0.88, 14, curve=EASE_OUT), kf("Double", 1, 40)]),
        keyed(RING, 17, [kf("Double", 1, 0, curve=EASE_OUT), kf("Double", 0.88, 14, curve=EASE_OUT), kf("Double", 1, 40)]),
        keyed(RING, 18, [kf("Double", 0.55, 0, curve=EASE_OUT), kf("Double", 1, 14, curve=EASE_OUT), kf("Double", 0.8, 40)]),
    ]),
    # Separate layer: the glow breathes regardless of decision.
    animation("Ambient", A_AMBIENT, 150, "pingPong", [
        keyed(GLOW, 16, [kf("Double", 0.92, 0, curve=EASE_IN_OUT), kf("Double", 1.06, 150)]),
        keyed(GLOW, 17, [kf("Double", 0.92, 0, curve=EASE_IN_OUT), kf("Double", 1.06, 150)]),
        keyed(GLOW, 18, [kf("Double", 0.75, 0, curve=EASE_IN_OUT), kf("Double", 1, 150)]),
    ]),
]

# ---------------------------------------------------------------- state machine
S_NEUTRAL, S_ALLOW, S_STEPUP, S_DENY, S_AMBIENT = nid(), nid(), nid(), nid(), nid()
state_of = {0: S_NEUTRAL, 1: S_ALLOW, 2: S_STEPUP, 3: S_DENY}
anim_of = {0: A_NEUTRAL, 1: A_ALLOW, 2: A_STEPUP, 3: A_DENY}
pos_of = {0: (160, 0), 1: (460, -160), 2: (460, 0), 3: (460, 160)}


def when_decision(target_value, to_state, ms=220):
    return (f'<StateTransition stateToId="{to_state}" duration="{ms}">'
            '<TransitionViewModelCondition opValue="equal">'
            '<TransitionPropertyViewModelComparator><BindablePropertyNumber>'
            f'<DataBindContext sourcePathIds="{VM}-{P_DECISION}" propertyKey="636"/>'
            '</BindablePropertyNumber></TransitionPropertyViewModelComparator>'
            f'<TransitionValueNumberComparator value="{target_value}"/>'
            '</TransitionViewModelCondition></StateTransition>')


def state(n):
    x, y = pos_of[n]
    outs = "".join(when_decision(m, state_of[m]) for m in (1, 2, 3, 0) if m != n)
    reset = ' reset="true"' if n in (1, 3) else ""
    return f'<AnimationState x="{x}" y="{y}" animationId="{anim_of[n]}"{reset} id="{state_of[n]}">{outs}</AnimationState>'


machine = f"""
<StateMachine name="Decision" id="{SM}">
  <StateMachineLayer name="Decision" id="{nid()}">
    <AnyState x="760" y="-160"/>
    <ExitState x="760" y="160"/>
    <EntryState x="0" y="0"><StateTransition stateToId="{S_NEUTRAL}"/></EntryState>
    {''.join(state(n) for n in (0, 1, 2, 3))}
  </StateMachineLayer>
  <StateMachineLayer name="Ambient" id="{nid()}">
    <AnyState x="400" y="320"/>
    <ExitState x="560" y="320"/>
    <EntryState x="0" y="320"><StateTransition stateToId="{S_AMBIENT}"/></EntryState>
    <AnimationState x="200" y="320" animationId="{A_AMBIENT}" id="{S_AMBIENT}"/>
  </StateMachineLayer>
</StateMachine>
"""

# ---------------------------------------------------------------- art
# Shackle: a U of two legs and a half-circle top, in the shape's local space.
# Legs sit at x=+/-36, tops at y=-30, arc apex at y=-66. k = 36 * 0.5523.
K = 19.88
HALF_PI = 1.5707964

art = f"""
<Node x="120" y="154" name="Lock" id="{LOCK}">
  <Shape name="Status Ring" id="{RING}" opacity="0.55">
    <Ellipse width="74" height="74" name="Path"/>
    <Stroke thickness="2" name="Stroke"><SolidColor colorValue="{BLUE}" name="Color" id="{RING_COLOR}"/></Stroke>
  </Shape>
  <Shape name="Keyhole" id="{KEYHOLE}">
    <Ellipse x="0" y="-11" width="26" height="26" name="Bow"/>
    <PointsPath isClosed="true" name="Bit">
      <StraightVertex x="-6.5" y="-4"/>
      <StraightVertex x="6.5" y="-4"/>
      <StraightVertex x="10.5" y="22" radius="2"/>
      <StraightVertex x="-10.5" y="22" radius="2"/>
    </PointsPath>
    <Fill name="Fill"><SolidColor colorValue="{BLUE}" name="Color" id="{KEYHOLE_COLOR}"/></Fill>
  </Shape>
  <Shape name="Body" id="{BODY_SHAPE}">
    <Rectangle width="128" height="100" cornerRadiusTL="22" name="Path"/>
    <Fill name="Fill"><SolidColor colorValue="{BODY}" name="Color"/></Fill>
    <Stroke thickness="1.5" name="Edge"><SolidColor colorValue="{BODY_EDGE}" name="Color"/></Stroke>
  </Shape>
  <Node x="0" y="0" name="Shackle Pivot">
    <Shape y="-42" name="Shackle" id="{SHACKLE}">
    <PointsPath name="Path">
      <StraightVertex x="-36" y="12"/>
      <CubicDetachedVertex x="-36" y="-30" inRotation="{HALF_PI}" inDistance="0" outRotation="-{HALF_PI}" outDistance="{K}"/>
      <CubicMirroredVertex x="0" y="-66" rotation="0" distance="{K}"/>
      <CubicDetachedVertex x="36" y="-30" inRotation="-{HALF_PI}" inDistance="{K}" outRotation="{HALF_PI}" outDistance="0"/>
      <StraightVertex x="36" y="12"/>
    </PointsPath>
    <Stroke thickness="14" cap="round" join="round" name="Steel"><SolidColor colorValue="{STEEL}" name="Color"/></Stroke>
    </Shape>
  </Node>
</Node>
<Shape x="120" y="140" name="Glow" id="{GLOW}">
  <Ellipse width="200" height="200" name="Path"/>
  <Fill name="Fill">
    <RadialGradient startX="0" startY="0" endX="100" endY="0" name="Gradient">
      <GradientStop colorValue="{glow(BLUE)}" position="0" name="Core" id="{GLOW_STOP}"/>
      <GradientStop colorValue="004F86FF" position="1" name="Edge"/>
    </RadialGradient>
  </Fill>
</Shape>
"""

view_model = f"""
<ViewModel defaultInstanceId="{VMI}" name="Padlock" id="{VM}">
  <ViewModelPropertyNumber name="decision" id="{P_DECISION}"/>
  <ViewModelInstance exports="true" name="Default" id="{VMI}">
    <ViewModelInstanceNumber propertyValue="0" viewModelPropertyId="{P_DECISION}"/>
  </ViewModelInstance>
</ViewModel>
"""

doc = f"""<Rive version="1" kind="fragment">
<Artboard defaultStateMachineId="{SM}" viewModelId="{VM}" viewModelInstanceId="{VMI}" styleId="0:5" width="240" height="240" name="Padlock" id="{AB}">
  <LayoutComponentStyle name="Artboard Style" id="0:5"/>
  {art}
  {machine}
  {''.join(anims)}
</Artboard>
{view_model}
</Rive>
"""

with open("scene.rml", "w") as f:
    f.write(doc)
print("wrote scene.rml")
