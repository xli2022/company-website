// Babeltime studio site. Built by build.py from the design project; edit there, or edit this file and re-run esbuild (see README.md).
// ---------- design-system components ----------

const TONES = {
  orange: ['var(--orange-100)', 'var(--orange-700)'],
  sky: ['var(--sky-100)', 'var(--sky-700)'],
  grass: ['#E3F6DC', 'var(--grass-700)'],
  gold: ['#FFF3CC', '#7A5800'], // --gold-700 is only 2.9:1 on this cream
  ruby: ['#FDE3E1', 'var(--ruby-700)'],
  neutral: ['var(--ink-100)', 'var(--ink-700)'],
  solid: ['var(--ink-900)', '#fff'],
};
function Badge({ tone = 'orange', children, style }) {
  const t = TONES[tone] || TONES.orange;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 'var(--radius-pill)', background: t[0], color: t[1],
      fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.4, whiteSpace: 'nowrap', ...style }}>
      {children}
    </span>
  );
}


const VARIANTS = {
  primary: { bg: 'var(--orange-500)', hov: 'var(--orange-400)', ledge: 'var(--orange-700)', fg: 'var(--ink-900)', bd: 'transparent' },
  sky: { bg: 'var(--sky-600)', hov: 'var(--sky-500)', ledge: 'var(--sky-700)', fg: '#fff', bd: 'transparent' },
  dark: { bg: 'var(--ink-900)', hov: 'var(--ink-700)', ledge: '#060d18', fg: '#fff', bd: 'transparent' },
  light: { bg: '#fff', hov: 'var(--paper)', ledge: 'var(--ink-300)', fg: 'var(--ink-900)', bd: 'var(--ink-200)' },
  ghost: { bg: 'transparent', hov: 'rgba(20,35,59,0.06)', ledge: null, fg: 'var(--ink-900)', bd: 'transparent' },
};
const SIZES = {
  sm: { pad: '8px 16px', fs: 14, ledge: 3 },
  md: { pad: '12px 24px', fs: 16, ledge: 5 },
  lg: { pad: '16px 32px', fs: 20, ledge: 6 },
};
// busy: looks and acts disabled, but keeps keyboard focus (a disabled button drops focus to the page)
function Button({ variant = 'primary', size = 'md', href, children, iconRight, disabled, busy, fullWidth, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const off = disabled || busy;
  const depth = !v.ledge ? 0 : off ? s.ledge : press ? 1 : hover ? s.ledge + 2 : s.ledge;
  const y = !v.ledge || off ? 0 : press ? s.ledge - 1 : hover ? -2 : 0;
  const Tag = href && !disabled ? 'a' : 'button';
  return (
    <Tag href={href} onClick={busy ? (e) => e.preventDefault() : disabled ? undefined : onClick} disabled={Tag === 'button' ? disabled : undefined} aria-disabled={busy ? 'true' : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{
        // the hit box: it never moves, so a press that starts on the button always ends on it
        display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined, padding: 0, border: 0, background: 'none', font: 'inherit',
        borderRadius: 'var(--radius-pill)', textDecoration: 'none', cursor: off ? 'not-allowed' : 'pointer', color: v.fg, opacity: off ? 0.45 : 1, ...style,
      }}>
      {/* the face takes no pointer events, so hover and press always land on the still hit box, even where the lifted face
          overhangs it; and it is only transformed while it moves, so at rest it does not paint over the hit box's focus ring */}
      <span style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, pointerEvents: 'none',
        fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: s.fs, lineHeight: 1.2, whiteSpace: 'nowrap',
        padding: s.pad, borderRadius: 'var(--radius-pill)', border: '2px solid ' + v.bd, background: hover && !off ? v.hov : v.bg,
        boxShadow: v.ledge ? '0 ' + depth + 'px 0 ' + v.ledge : 'none', transform: y ? 'translateY(' + y + 'px)' : 'none',
        transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)',
      }}>
        {children}{iconRight ? <span aria-hidden="true">{iconRight}</span> : null}
      </span>
    </Tag>
  );
}


// as: the heading level; 'h1' where the heading is the page's own title
function SectionHeading({ eyebrow, title, description, align = 'left', inverse, as: H = 'h2', style }) {
  return (
    <div style={{ textAlign: align, maxWidth: 720, margin: align === 'center' ? '0 auto' : undefined, ...style }}>
      {eyebrow ? <div style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 13, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: inverse ? 'var(--orange-300)' : 'var(--orange-700)', marginBottom: 10 }}>{eyebrow}</div> : null}
      <H style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(32px, 4.5vw, 48px)', lineHeight: 1.08, letterSpacing: 'var(--tracking-display)', color: inverse ? '#fff' : 'var(--text-heading)', margin: 0, textWrap: 'balance' }}>{title}</H>
      {description ? <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.6, color: inverse ? 'var(--ink-200)' : 'var(--text-muted)', margin: '14px 0 0', textWrap: 'pretty' }}>{description}</p> : null}
    </div>
  );
}




function GameCard({ image, genre, title, description, ctaLabel = 'Learn more', href, platforms = [], isNew, layout = 'vertical', style }) {
  const [hover, setHover] = React.useState(false);
  const horiz = layout === 'horizontal';
  return (
    <article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: horiz ? 'row' : 'column', flexWrap: horiz ? 'wrap' : 'nowrap', background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-card-hover)' : 'var(--shadow-card)', transform: hover ? 'translateY(-4px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)', ...style }}>
      <div style={{ flex: horiz ? '1 1 320px' : 'none', aspectRatio: horiz ? undefined : '16 / 9', minHeight: horiz ? 260 : undefined, overflow: 'hidden', background: 'var(--sky-100)' }}>
        <div style={{ width: '100%', height: '100%', minHeight: 'inherit', backgroundImage: image ? 'url(' + image + ')' : 'none', backgroundSize: 'cover', backgroundPosition: 'center',
          transform: hover ? 'scale(1.05)' : 'scale(1)', transition: 'transform 600ms var(--ease-out)' }} />
      </div>
      <div style={{ flex: horiz ? '1 1 320px' : 'none', padding: 28, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{isNew ? <Badge tone="gold">New</Badge> : null}{genre ? <Badge tone="sky">{genre}</Badge> : null}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, lineHeight: 1.1, color: 'var(--text-heading)', margin: 0 }}>{title}</h3>
        {description ? <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.6, color: 'var(--text-body)', margin: 0, textWrap: 'pretty' }}>{description}</p> : null}
        {platforms.length ? <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{platforms.map((p) => <Badge key={p} tone="neutral">{p}</Badge>)}</div> : null}
        <Button href={href} iconRight="→" style={{ marginTop: 8 }}>{ctaLabel}</Button>
      </div>
    </article>
  );
}


function Stat({ value, label, tone = 'orange', style }) {
  const c = tone === 'sky' ? 'var(--sky-600)' : tone === 'inverse' ? '#fff' : 'var(--orange-600)';
  return (
    <div style={{ ...style }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 56, lineHeight: 1, color: c }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 13, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: tone === 'inverse' ? 'var(--ink-200)' : 'var(--text-muted)', marginTop: 8 }}>{label}</div>
    </div>
  );
}


function Input({ label, hint, error, multiline, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)', ...style }}>
      {label ? <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-heading)' }}>{label}</span> : null}
      <Tag {...rest} rows={multiline ? 4 : undefined} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ fontFamily: 'inherit', fontSize: 16, color: 'var(--text-heading)', background: '#fff', padding: '12px 16px', borderRadius: 'var(--radius-md)', outline: 'none', resize: multiline ? 'vertical' : undefined,
          border: '2px solid ' + (error ? 'var(--ruby-500)' : focus ? 'var(--sky-500)' : 'var(--ink-200)'), boxShadow: focus ? '0 0 0 4px var(--sky-100)' : 'none', transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)' }} />
      {error || hint ? <span style={{ fontSize: 13, color: error ? 'var(--ruby-700)' : 'var(--text-muted)' }}>{error || hint}</span> : null}
    </label>
  );
}



function JobRow({ title, team, location, type, href, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '20px 24px', background: '#fff', borderRadius: 'var(--radius-lg)', textDecoration: 'none',
        border: '2px solid ' + (hover ? 'var(--ink-900)' : 'var(--ink-200)'), boxShadow: hover ? '0 5px 0 var(--ink-900)' : '0 0 0 var(--ink-900)', transform: hover ? 'translateY(-3px)' : 'none',
        transition: 'all var(--dur-fast) var(--ease-out)', ...style }}>
      <div style={{ flex: '1 1 240px', minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, color: 'var(--text-heading)' }}>{title}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', marginTop: 2 }}>{[team, location].filter(Boolean).join(' · ')}</div>
      </div>
      {type ? <Badge tone="neutral">{type}</Badge> : null}
      <span aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: hover ? 'var(--orange-600)' : 'var(--ink-300)', transform: hover ? 'translateX(4px)' : 'none', transition: 'all var(--dur-fast)' }}>→</span>
    </a>
  );
}




// Below this width the links and CTA fold into a menu behind a hamburger button.
const NARROW = '(max-width: 760px)';
function useNarrow() {
  const get = () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(NARROW).matches;
  const [narrow, setNarrow] = React.useState(get);
  React.useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(NARROW);
    const on = () => setNarrow(mq.matches);
    on();
    if (mq.addEventListener) mq.addEventListener('change', on); else mq.addListener(on);
    return () => { if (mq.removeEventListener) mq.removeEventListener('change', on); else mq.removeListener(on); };
  }, []);
  return narrow;
}

function NavBar({ logoSrc, logoAlt = 'Babeltime', links = [], active, onNavigate, cta, style }) {
  const [hover, setHover] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const narrow = useNarrow();
  const root = React.useRef(null), toggle = React.useRef(null), menu = React.useRef(null);
  React.useEffect(() => { if (!narrow) setOpen(false); }, [narrow]);
  // the open menu closes on Escape, when the page is scrolled, and when a press or the focus lands outside the header
  React.useEffect(() => {
    if (!open) return;
    const y0 = window.scrollY;
    // keys that scroll the page (Space, arrows, Page Down) close the menu too; focus on one of its links goes back to the
    // menu button rather than falling to the page when the menu disappears
    const shut = () => { if (menu.current && toggle.current && menu.current.contains(document.activeElement)) toggle.current.focus(); setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') shut(); };
    const scroll = () => { if (Math.abs(window.scrollY - y0) > 24) shut(); };
    const out = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false); };
    window.addEventListener('keydown', esc);
    window.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('pointerdown', out);
    document.addEventListener('focusin', out);
    return () => { window.removeEventListener('keydown', esc); window.removeEventListener('scroll', scroll); document.removeEventListener('pointerdown', out); document.removeEventListener('focusin', out); };
  }, [open]);
  // with a real href and no onNavigate, the link is left to the browser, so new-tab and new-window clicks work as usual
  const nav = (label) => (e) => { setOpen(false); if (onNavigate) { e.preventDefault(); onNavigate(label); } };
  // drawn as a border in the text colour, so the icon survives forced-colors (high contrast) mode
  const bar = (n) => ({ position: 'absolute', left: 11, width: 22, height: 0, borderTop: '3px solid currentColor', borderRadius: 2, transition: 'transform var(--dur-base) var(--ease-out), opacity var(--dur-fast)',
    top: 20.5, transform: open ? (n === 0 ? 'rotate(45deg)' : n === 2 ? 'rotate(-45deg)' : 'scaleX(0)') : 'translateY(' + (n - 1) * 7 + 'px)', opacity: open && n === 1 ? 0 : 1 });
  return (
    <header ref={root} style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: '2px solid var(--ink-100)', ...style }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--gutter)', height: 'var(--nav-height)', display: 'flex', alignItems: 'center', gap: narrow ? 12 : 24 }}>
        <a href={(links[0] && links[0].href) || '#'} onClick={nav(links[0] && links[0].label)} style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
          {logoSrc ? <img src={logoSrc} alt={logoAlt} style={{ height: narrow ? 34 : 40, display: 'block' }} /> : <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--ink-900)' }}>{logoAlt}</span>}
        </a>
        {narrow ? (
          <button ref={toggle} type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="bt-nav-menu" onClick={() => setOpen(!open)}
            style={{ position: 'relative', width: 44, height: 44, flex: 'none', padding: 0, border: '2px solid var(--ink-100)', borderRadius: 'var(--radius-md)', background: open ? 'var(--ink-100)' : '#fff', color: 'var(--ink-900)', cursor: 'pointer' }}>
            <span aria-hidden="true" style={bar(0)}></span><span aria-hidden="true" style={bar(1)}></span><span aria-hidden="true" style={bar(2)}></span>
          </button>
        ) : (
          <React.Fragment>
            <nav style={{ display: 'flex', gap: 4 }}>
              {links.map((l) => {
                const on = active === l.label;
                return (
                  <a key={l.label} href={l.href || '#'} onMouseEnter={() => setHover(l.label)} onMouseLeave={() => setHover(null)} onClick={nav(l.label)} aria-current={on ? 'page' : undefined}
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, textDecoration: 'none', padding: '8px 14px', borderRadius: 'var(--radius-pill)',
                      color: on ? 'var(--orange-700)' : 'var(--ink-700)', background: on ? 'var(--orange-100)' : hover === l.label ? 'var(--ink-100)' : 'transparent', transition: 'background var(--dur-fast)' }}>
                    {l.label}
                  </a>
                );
              })}
            </nav>
            {cta ? <Button size="sm" href={cta.href} onClick={cta.onClick}>{cta.label}</Button> : null}
          </React.Fragment>
        )}
      </div>
      {narrow && open ? (
        // overscroll stays inside the menu, so scrolling it to the end does not scroll the page and close it
        <nav id="bt-nav-menu" ref={menu} style={{ position: 'absolute', left: 0, right: 0, top: '100%', background: '#fff', borderBottom: '2px solid var(--ink-100)', boxShadow: 'var(--shadow-pop)', padding: '8px var(--gutter) 20px', display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 'calc(100dvh - var(--nav-height))', overflowY: 'auto', overscrollBehavior: 'contain' }}>
          {links.map((l) => {
            const on = active === l.label;
            return (
              <a key={l.label} href={l.href || '#'} onClick={nav(l.label)} aria-current={on ? 'page' : undefined}
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, textDecoration: 'none', padding: '12px 16px', minHeight: 48, display: 'flex', alignItems: 'center', borderRadius: 'var(--radius-md)',
                  color: on ? 'var(--orange-700)' : 'var(--ink-900)', background: on ? 'var(--orange-100)' : 'transparent' }}>
                {l.label}
              </a>
            );
          })}
          {cta ? <div style={{ marginTop: 12 }}><Button href={cta.href} onClick={(e) => { setOpen(false); if (cta.onClick) cta.onClick(e); }} style={{ width: '100%', justifyContent: 'center' }}>{cta.label}</Button></div> : null}
        </nav>
      ) : null}
    </header>
  );
}


function FooterLink({ link }) {
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  // keyboard focus keeps the highlight on its own, so moving the mouse over and off a focused link does not hide where focus is
  const on = hover || focus;
  return (
    // the link's box stays put, with room on the right for the slide (taken back by a negative margin, so the footer columns
    // keep their width); only the label inside moves, so it never slides out from under a resting pointer
    <a href={link.href || '#'} onClick={link.onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', minHeight: 28, paddingRight: 18, marginRight: -18, fontSize: 15, textDecoration: 'none', outline: 'none',
        color: on ? 'var(--orange-700)' : 'var(--text-body)', transition: 'color var(--dur-fast)' }}>
      <span style={{ position: 'relative', display: 'inline-block', fontWeight: on ? 700 : 400, transform: on ? 'translateX(18px)' : 'none', transition: 'transform var(--dur-base) var(--ease-out)' }}>
        <span aria-hidden="true" style={{ position: 'absolute', left: -18, pointerEvents: 'none', fontFamily: 'var(--font-display)', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateX(-6px)', transition: 'opacity var(--dur-fast), transform var(--dur-base) var(--ease-out)' }}>→</span>
        {link.label}
      </span>
    </a>
  );
}
function FooterLogo({ src, href, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    // the picture lifts, not the link, so the bottom edge of the link stays under the pointer
    <a href={href || '#'} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ display: 'inline-block' }}>
      <img src={src} alt="Babeltime" style={{ height: 44, display: 'block', transform: hover ? 'translateY(-3px) rotate(-2deg)' : 'none', transition: 'transform var(--dur-base) var(--ease-bounce)' }} />
    </a>
  );
}
function Footer({ logoSrc, logoHref, onLogoClick, tagline, columns = [], copyright, style }) {
  return (
    <footer style={{ background: '#fff', borderTop: '2px solid var(--ink-100)', fontFamily: 'var(--font-body)', ...style }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '48px var(--gutter)' }}>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 260px' }}>
            {logoSrc ? <FooterLogo src={logoSrc} href={logoHref} onClick={onLogoClick} /> : null}
            {tagline ? <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--text-muted)', margin: '16px 0 0', maxWidth: 280 }}>{tagline}</p> : null}
          </div>
          {columns.map((col) => (
            <div key={col.title} style={{ flex: 'none' }}>
              <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--text-heading)', marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.links.map((l) => <FooterLink key={l.label} link={l} />)}
              </div>
            </div>
          ))}
        </div>
        {copyright ? <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--ink-100)', fontSize: 13, color: 'var(--text-muted)' }}>{copyright}</div> : null}
      </div>
    </footer>
  );
}

// ---------- the site ----------
// each HTML shell says which page it is and where the site root is relative to it
const ROOT = window.BT_ROOT || '';
const A = ROOT + 'site/media/';
const URLS = { 'Home': 'index.html', 'Games': 'games.html', 'Jobs': 'jobs.html', 'Contact': 'contact.html', 'Rich Revenge': 'rich-revenge/index.html', 'Realm Defense': 'realm-defense/index.html', 'Draft Wars': 'draft-wars/index.html' };
const url = (p) => ROOT + (URLS[p] || URLS.Home);
const LINKS = ['Home', 'Games', 'Jobs', 'Contact'].map((label) => ({ label, href: url(label) }));
// every in-site link is a plain anchor to the page's own URL
const link = (p) => ({ href: url(p) });
const wrap = { maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--gutter)' };
const STORE = { rrIos: 'https://apps.apple.com/us/app/rich-revenge-merge-match/id6759077338', rrAndroid: 'https://play.google.com/store/apps/details?id=com.babeltimeus.richrevenge&hl=en_US', rdIos: 'https://apps.apple.com/app/id1197076384', rdAndroid: 'https://play.google.com/store/apps/details?id=com.babeltimeus.legendstd', dwAndroid: 'https://play.google.com/store/apps/details?id=com.babeltimeus.draftwars' };
// a game out on more than one store shows a button for each; the others keep their single call to action
const cta = (g, size, second) => (g.stores || [{ label: g.ctaLabel, href: g.href }]).map((st, n) => <Button key={st.label} size={size} variant={n === 0 ? 'primary' : second} href={st.href} iconRight="→">{st.label}</Button>);
const GAMES = [
  // scene: the full-bleed original art the hero camera travels through; focus: the point the camera pushes into (0–1 from the image's top-left)
  { image: A + 'rich-revenge-background.jpg', focus: [0.5, 0.5], mist: [1.0, 0.9, 0.82], genre: 'Merge & Story', title: 'Rich Revenge: Merge & Match', stores: [{ label: 'App Store', href: STORE.rrIos }, { label: 'Google Play', href: STORE.rrAndroid }], page: 'Rich Revenge', platforms: ['iOS', 'Android'], isNew: true, short: 'Rich Revenge', accent: 'var(--gold-500)', tagline: 'Merge fine dining with sweet revenge.',
    description: 'The Riches Equestrian Club has a new cook, and her secret ingredient is revenge. Help Emma merge fine dining, reclaim her family home, and expose the Riches family.' },
  { image: A + 'realm-defense-background.jpg', focus: [0.49, 0.6], mist: [0.9, 0.96, 1.0], genre: 'Tower Defense RPG', title: 'Realm Defense', ctaLabel: 'Join the defense', href: 'https://www.babeltimeca.com/realm-defense/index.html', page: 'Realm Defense', platforms: ['iOS', 'Android'], short: 'Realm Defense', accent: 'var(--grass-500)', tagline: 'Legendary heroes. Endless waves.',
    description: 'Defender! The kingdom is under attack. Join forces with legendary heroes to fight off waves of evil in this epic tower defense strategy game.' },
  { image: A + 'draft-wars-background.jpg', focus: [0.52, 0.48], mist: [0.95, 0.97, 1.0], genre: 'Real-Time PvP Strategy', title: 'Draft Wars: PvP Tower Defense', ctaLabel: 'Get it on Google Play', href: STORE.dwAndroid, page: 'Draft Wars', platforms: ['Android'], short: 'Draft Wars', accent: 'var(--sky-500)', tagline: 'Draft your squad. Win in five minutes.',
    description: 'Pick a hero, draft a lineup from 30+ units across three factions, and out-think rival commanders in fast online duels that never run past five minutes.' },
];
const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HEADLINE = 'Creating worlds you’ll love to inhabit.'.split(' ');
function HeroFrame({ game }) {
  return (
    <div style={{ flex: '1.25 1 420px', minWidth: 0 }}>
      <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 8px 0 ' + game.accent, transition: 'box-shadow var(--dur-base)', background: '#fff' }}>
        <div style={{ position: 'relative', background: 'var(--ink-700)' }}>
          <img key={game.title} src={game.image} alt={game.title + ' key art'} style={{ display: 'block', width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', animation: 'bt-fade 500ms var(--ease-out) both' }} />
          <div style={{ position: 'absolute', left: 16, top: 16, display: 'flex', gap: 6 }}>{game.isNew ? <Badge tone="gold">New</Badge> : null}<Badge tone="solid">{game.genre}</Badge></div>
        </div>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div key={game.title} style={{ flex: '1 1 200px', minWidth: 0, animation: 'bt-rise 450ms var(--ease-out) both' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px, 2.2vw, 26px)', lineHeight: 1.1, color: 'var(--ink-900)' }}>{game.short}</div>
            <div style={{ fontSize: 15, color: 'var(--ink-700)', marginTop: 4 }}>{game.tagline}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{cta(game, 'sm', 'dark')}</div>
        </div>
      </div>
    </div>
  );
}
function Tilt({ children }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });
  const move = (e) => {
    if (REDUCED) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 8, ry: (px - 0.5) * 12, gx: px * 100, gy: py * 100, on: true });
  };
  return (
    <div style={{ width: '100%', display: 'flex', perspective: 1100 }}>
      <div ref={ref} onMouseMove={move} onMouseLeave={() => setT({ rx: 0, ry: 0, gx: 50, gy: 50, on: false })}
        style={{ position: 'relative', width: '100%', display: 'flex', transform: 'rotateX(' + t.rx + 'deg) rotateY(' + t.ry + 'deg)', transition: t.on ? 'transform 80ms linear' : 'transform 500ms var(--ease-bounce)' }}>
        {children}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-xl)', pointerEvents: 'none', opacity: t.on ? 1 : 0, transition: 'opacity 300ms', background: 'radial-gradient(circle at ' + t.gx + '% ' + t.gy + '%, rgba(255,255,255,.34), rgba(255,255,255,0) 45%)' }}></div>
      </div>
    </div>
  );
}
// Scroll-driven hero: the stage pins under the nav while scroll pushes the camera through each game's key art.
// x runs 0 (studio headline) to GAMES.length (last game in focus); game n is in focus at x = n + 1.
const NAV = 72;
const STAGE_H = 'min(calc(100vh - ' + NAV + 'px), 960px)';
const c01 = (v) => Math.min(1, Math.max(0, v));
// The one-take film: a single 8-second camera move that sweeps past the cast of all three games. Scroll scrubs it.
// TAKE_SCREENS is how many screens of scrolling the whole take lasts: lower it to make the hero shorter.
const TAKE = A + 'hero-take.mp4';
const TAKE_SCREENS = 2;
// Where each game is on screen in the take, as scroll progress, mapped onto the hero's own timeline (x = n + 1 puts game n in focus).
const TAKE_MAP = [[0, 0], [0.05, 0.6], [0.08, 0.85], [0.36, 1.2], [0.4, 1.4], [0.56, 1.6], [0.6, 1.85], [0.68, 2.2], [0.7, 2.4], [0.75, 2.6], [0.78, 2.85], [0.86, 3.2], [0.9, 3.4], [1, 3.5]];
// Scroll progress to seconds of film. The film is used in two parts with a cloud bridge between them:
// part one (Rich Revenge) runs up to TAKE_CUT[0]; part two (Realm Defense, Draft Wars, the clouds) starts at TAKE_CUT[1].
// The seconds in between are skipped because the generator drew a character there who is not in any of the games.
const TAKE_CUT = [2.9, 4.4];
const TAKE_ONE = [[0, 0], [0.44, 2.9]];
const TAKE_TWO = [[0.55, 4.4], [0.73, 5.55], [0.9, 7.6], [1, 8.0]];
const TAKE_BRIDGE = [0.44, 0.55];
const TAKE_JUMP = [0.2, 0.62, 0.8];
const lerpMap = (m, p) => { p = Math.max(m[0][0], p); for (let i = 1; i < m.length; i++) { const a = m[i - 1], b = m[i]; if (p <= b[0]) return a[1] + (b[1] - a[1]) * (p - a[0]) / (b[0] - a[0]); } return m[m.length - 1][1]; };
const takeX = (p) => lerpMap(TAKE_MAP, p);
// onOutro(on): told when the hero passes 95% of its scroll; the outro starts fading in at 90%, and from 95% (60% opaque) it
// is visible enough to take clicks and taps
function Hero({ go, onOutro }) {
  const track = React.useRef(null), outro = React.useRef(false);
  const [x, setX] = React.useState(0);
  const N = GAMES.length;
  const END = N + 0.5; // the last half step is the clouds rising into Featured Games
  // pointer parallax: eased values are written to --mx / --my on the stage, so moving the mouse never re-renders
  const stage = React.useRef(null), tgt = React.useRef({ x: 0, y: 0 }), cur = React.useRef({ x: 0, y: 0 }), loop = React.useRef(0);
  const tick = () => {
    const c = cur.current, t = tgt.current, s = stage.current;
    c.x += (t.x - c.x) * 0.08; c.y += (t.y - c.y) * 0.08;
    if (s) { s.style.setProperty('--mx', c.x.toFixed(4)); s.style.setProperty('--my', c.y.toFixed(4)); }
    loop.current = s && Math.abs(t.x - c.x) + Math.abs(t.y - c.y) > 0.001 ? requestAnimationFrame(tick) : 0;
  };
  const aim = (px, py) => { if (REDUCED) return; tgt.current = { x: px, y: py }; if (!loop.current) loop.current = requestAnimationFrame(tick); };
  const move = (e) => { const r = stage.current.getBoundingClientRect(); aim((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5); };
  const par = (dx, dy) => 'translate(calc(var(--mx) * ' + dx + 'px), calc(var(--my) * ' + dy + 'px))';
  const span = () => { const el = track.current; return el ? el.getBoundingClientRect().height - el.firstChild.offsetHeight : 0; };
  React.useEffect(() => {
    if (REDUCED) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      if (!track.current) return;
      const s = span();
      const p = s > 0 ? c01((NAV - track.current.getBoundingClientRect().top) / s) : 0;
      pRef.current = p;
      document.documentElement.style.setProperty('--take-p', p.toFixed(4));
      setX(TAKE ? takeX(p) : p * END);
      if (p >= 0.95 !== outro.current) { outro.current = p >= 0.95; if (onOutro) onOutro(outro.current); }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  // The world is the games' original art, untouched: a shader gives each picture depth (near edges move more than the
  // far focus point), pushes the camera into the focus as you scroll, and dissolves into the next world at full push.
  const canvas = React.useRef(null), xRef = React.useRef(0), pRef = React.useRef(0);
  const [depth, setDepth] = React.useState(false);
  // On a tall, narrow screen the wide film would be cropped to a sliver if it filled the stage. Instead it sits at the top,
  // about as tall as the screen is wide, and the game titles are set underneath it on paper.
  const TALL = '(max-aspect-ratio: 4/5)';
  const [tall, setTall] = React.useState(() => !!TAKE && !!window.matchMedia && window.matchMedia(TALL).matches);
  React.useEffect(() => {
    if (!TAKE || !window.matchMedia) return;
    const mq = window.matchMedia(TALL), on = () => setTall(mq.matches);
    on();
    if (mq.addEventListener) mq.addEventListener('change', on); else mq.addListener(on);
    return () => { if (mq.removeEventListener) mq.removeEventListener('change', on); else mq.removeListener(on); };
  }, []);
  // 200px is kept free under the film for the title and its line, however short the stage is. With reduced motion there are
  // no titles: the stage itself shrinks to the picture instead (see the stage's height below).
  const FILM_H = tall && !REDUCED ? 'min(120vw, 100% - 200px)' : '100%';
  xRef.current = x;
  React.useEffect(() => {
    // with reduced motion the poster is the whole hero: do not download or decode the film at all
    if (REDUCED && TAKE) return;
    const cv = canvas.current;
    const gl = cv && cv.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 p; varying vec2 v; void main(){ v = vec2(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5); gl_Position = vec4(p, 0.0, 1.0); }'));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, [
      // fp16 (mediump on most Android GPUs) cannot hold the noise hash, so ask for highp wherever it exists
      '#ifdef GL_FRAGMENT_PRECISION_HIGH',
      'precision highp float;',
      '#else',
      'precision mediump float;',
      '#endif',
      'uniform sampler2D tf, tk; uniform float lay, zf, fl, br; uniform vec2 ff;',
      'uniform sampler2D ta, tb; uniform vec2 res, sa, sb, fa, fb, m, pc; uniform vec3 ma, mb; uniform float za, zb, mx, pr, ks, cs, tm, en; varying vec2 v;',
      'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
      'float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);',
      '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }',
      'float fbm(vec2 p){ float s = 0.0, k = 0.5; for (int i = 0; i < 4; i++) { s += k * noise(p); p = p * 2.03 + 7.1; k *= 0.5; } return s / 0.9375; }',
      'vec3 world(sampler2D t, vec2 img, vec2 f, float z, vec2 q){',
      '  float rs = res.x / res.y, ri = img.x / img.y;',
      '  vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);',
      '  vec2 p = f + ((q - 0.5) * s + 0.5 - f) / z;',
      // fl = 1 moves the whole picture as one rigid sheet (the film), instead of stretching the edges more than the centre
      '  float d = mix(clamp(length((p - f) * vec2(1.0, 1.3)) * 1.9, 0.0, 1.0), 1.0, fl);',
      '  p += m * d * 0.045 / z;',
      '  p = abs(mod(p + 1.0, 2.0) - 1.0);', // mirror past the edges instead of smearing
      '  return texture2D(t, clamp(p, 0.002, 0.998)).rgb;',
      '}',
      // a world that has been split in two: the foreground (gate, pillars, hedges) is cut out of the original by a mask and
      // travels faster than the filled-in background behind it, so it sweeps past the camera on the way through
      'vec3 first(vec2 q){',
      '  vec3 bg = world(ta, sa, fa, za, q);',
      '  if (lay < 0.5) return bg;',
      '  float rs = res.x / res.y, ri = sa.x / sa.y;',
      '  vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);',
      '  vec2 p = fa + ((q - 0.5) * s + 0.5 - fa) / zf + m * 0.075 / zf;',
      '  float on = step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0);',
      '  p = clamp(p, 0.002, 0.998);',
      '  return mix(bg, texture2D(tf, p).rgb, texture2D(tk, p).r * on);',
      '}',
      'void main(){',
      '  vec2 dv = (v - pc) * vec2(res.x / res.y, 1.0);',
      '  float dist = length(dv), ang = atan(dv.y, dv.x);',
      // the world we are leaving streaks toward the portal as the camera accelerates
      '  vec3 a = vec3(0.0);',
      '  for (int i = 0; i < 6; i++) { a += first(pc + (v - pc) * (1.0 - mx * 0.16 * (1.0 - fl) * float(i) / 5.0)); }',
      '  a /= 6.0;',
      // the next world is already there, small and far away, at the point the camera is heading for
      '  vec3 b = world(tb, sb, fb, zb, vec2(0.5) + (v - mix(pc, vec2(0.5), cs)) / ks);',
      // cloud that streams outward past the camera: the noise field is scaled up as the push progresses
      '  float n = fbm(dv * 2.6 / (0.35 + mx * 1.5) + vec2(tm * 0.04, 0.0));',
      '  float edge = pr * (0.8 + 0.5 * n);',
      '  float soft = 0.08 + 0.3 * pr;',
      '  float inside = 1.0 - smoothstep(edge - soft, edge, dist);',
      '  vec3 col = mix(a, b, inside);',
      // the two pictures never touch: a bank of mist sits on the seam and veils the whole frame at mid-push
      '  float bell = sin(3.14159 * mx);',
      '  float ring = exp(-pow((dist - edge) / (0.08 + 0.22 * bell), 2.0));',
      '  float puff = smoothstep(0.3, 0.75, n);',
      '  float mist = clamp((ring * 0.8 + bell * 0.16) * (0.25 + 1.25 * puff), 0.0, 0.92) * smoothstep(0.0, 0.1, mx) * (1.0 - smoothstep(0.88, 1.0, mx));',
      '  col = mix(col, mix(ma, mb, mx), mist);',
      // bridge between the two parts of the film: the foreground subject of part one (the horse) is cut out by a matte and keeps
      // coming toward the camera on the top layer until it slides out of frame, while part two is already there behind it
      '  if (br > 0.0) {',
      '    float rs = res.x / res.y, ri = sa.x / sa.y;',
      '    vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);',
      '    vec2 c = (v - 0.5) * s + 0.5;',
      // part one, horse and all, keeps moving as ONE picture: zf is how much further it has grown since the bridge began, about a
      // point off the right edge, so everything slides left as it grows. Because the horse on top and the picture underneath share
      // this one transform, the horse underneath is always exactly covered and no outline of it is ever left behind.
      '    vec2 q1 = ff + (fa + (c - fa) / za + m * 0.045 / za - ff) / zf;',
      '    float on = step(0.0, q1.x) * step(q1.x, 1.0) * step(0.0, q1.y) * step(q1.y, 1.0);',
      '    q1 = clamp(q1, 0.002, 0.998);',
      '    vec3 am = texture2D(ta, q1).rgb;',
      // everything except the horse whitens into a bright cloud, the cloud holds, then part two comes out of it
      '    vec3 cloud = mix(vec3(1.0, 0.985, 0.95), vec3(0.9, 0.95, 1.0), n);',
      '    float k1 = clamp(smoothstep(0.0, 0.3, br) + (n - 0.5) * 0.6 * smoothstep(0.0, 0.1, br) * (1.0 - smoothstep(0.25, 0.35, br)), 0.0, 1.0);',
      '    float k2 = clamp(smoothstep(0.4, 0.95, br) * 1.5 + (n - 0.5) * 0.9, 0.0, 1.0) * smoothstep(0.38, 0.5, br);',
      '    vec3 bg = mix(mix(am, cloud, k1), world(tb, sb, fb, zb, v), k2);',
      '    col = mix(bg, am, texture2D(tk, q1).r * on);',
      '  } else if (br < 0.0) {',
      '    col = mix(world(ta, sa, fa, za, v), world(tb, sb, fb, zb, v), smoothstep(0.0, 1.0, -br));',
      '  }',
      // the last world sinks into the same cloud, which becomes the paper ground of the next section
      '  float up = (1.0 - v.y) + (fbm(vec2(v.x * 3.2 + tm * 0.03, v.y * 2.2 - en * 1.6)) - 0.5) * 0.36;',
      '  float lvl = mix(-0.25, 1.3, en);',
      '  col = mix(col, vec3(0.965, 0.976, 0.988), 1.0 - smoothstep(lvl - 0.2, lvl + 0.04, up));',
      '  gl_FragColor = vec4(col, 1.0);',
      '}',
    ].join('\n')));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {};
    ['ta', 'tb', 'res', 'sa', 'sb', 'fa', 'fb', 'm', 'za', 'zb', 'mx', 'pc', 'pr', 'ks', 'cs', 'tm', 'ma', 'mb', 'en', 'tf', 'tk', 'lay', 'zf', 'fl', 'br', 'ff'].forEach((k) => { U[k] = gl.getUniformLocation(pr, k); });
    const tex = GAMES.map(() => null);
    const ext = GAMES.map(() => null);
    let alive = true, left = TAKE ? 0 : GAMES.reduce((k, g) => k + (g.layers ? 3 : 1), 0), raf = 0, vis = true, snap = false, pend = 0;
    const t0 = performance.now();
    // the take: a muted video that is never played, only seeked to the frame the scroll position asks for
    const vid = TAKE ? document.createElement('video') : null;
    const vid2 = TAKE ? document.createElement('video') : null;
    const vtex = gl.createTexture(), vtex2 = gl.createTexture();
    let vt = 0, vt2 = TAKE_CUT[1], got1 = -1, got2 = -1, shown = false;
    [vtex, vtex2].forEach((tx) => {
      gl.bindTexture(gl.TEXTURE_2D, tx);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    });
    // loaded whole and handed over as a blob, so every frame can be seeked even where the host does not serve byte ranges
    if (vid) {
      [vid, vid2].forEach((v) => { v.muted = true; v.playsInline = true; v.preload = 'auto'; });
      fetch(TAKE).then((r) => (r.ok ? r.blob() : Promise.reject(r.status))).then((b) => { if (alive) { const u = URL.createObjectURL(b); vid.src = u; vid.load(); vid2.src = u; vid2.load(); vid2.addEventListener('loadedmetadata', () => { vid2.currentTime = TAKE_CUT[1]; }, { once: true }); } }).catch(() => {});
    }
    const zoom = (n, xx) => 1.06 + 0.16 * c01(xx - (n === 0 ? 0 : n + 0.3)) + (n === N - 1 ? 0.35 : 2.4) * Math.pow(Math.max(0, xx - (n + 0.9)) / 0.85, 2);
    const ss = (e0, e1, v) => { const k = c01((v - e0) / (e1 - e0)); return k * k * (3 - 2 * k); };
    const draw = () => {
      // the loop only runs while the hero is on screen
      raf = REDUCED || !alive || !vis ? 0 : requestAnimationFrame(draw);
      if (left > 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(cv.clientWidth * dpr), h = Math.round(cv.clientHeight * dpr);
      if (!w || !h) return;
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); }
      // With the film there is nothing else to fall back on: until a frame has arrived the poster (the film's own first frame)
      // shows, and a frame that is still being seeked is never drawn, so no other picture can flash in between.
      if (vid) {
        if (!vid.videoWidth || !vid2.videoWidth) return;
        const p = pRef.current, tv = (performance.now() - t0) / 1000, cv2 = cur.current, end = Math.max(0, vid.duration - 0.06);
        const T = c01((p - TAKE_BRIDGE[0]) / (TAKE_BRIDGE[1] - TAKE_BRIDGE[0]));
        // take whatever frame each part has finished decoding, and only then ask for the next one
        // a frame that is already in the texture is not uploaded again
        const grab = (tx, v, last) => { if (v.readyState < 2 || v.seeking) return -1; if (v.currentTime === last) return last; try { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tx); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, v); return v.currentTime; } catch (e) { return -1; } };
        if (T < 1) { const g = grab(vtex, vid, got1); if (g >= 0) got1 = g; }
        if (T > 0) { const g = grab(vtex2, vid2, got2); if (g >= 0) got2 = g; }
        const seek = (v, at, want) => { const nx = snap ? want : at + (want - at) * 0.2; if (!v.seeking && Math.abs(v.currentTime - nx) > 0.012) v.currentTime = nx; return nx; };
        // inside the bridge both parts must sit exactly on their held frames, so skip the easing there
        const hold = (v, want) => { if (!v.seeking && Math.abs(v.currentTime - want) > 0.012) v.currentTime = want; return want; };
        vt = T > 0 ? hold(vid, TAKE_CUT[0]) : seek(vid, vt, Math.min(lerpMap(TAKE_ONE, p), end));
        vt2 = T < 1 ? hold(vid2, TAKE_CUT[1]) : seek(vid2, vt2, Math.min(lerpMap(TAKE_TWO, p), end));
        // Back on screen after the loop was stopped (the scroll may have jumped anywhere meanwhile): go straight to this scroll
        // position's frames instead of easing through every frame in between, and keep the last picture up until they arrive.
        if (snap) { snap = false; pend = performance.now(); }
        if (pend) {
          if (((T >= 1 || Math.abs(got1 - vt) < 0.05) && (T <= 0 || Math.abs(got2 - vt2) < 0.05)) || performance.now() - pend > 600) pend = 0;
          else return;
        }
        if ((T < 1 && got1 < 0) || (T > 0 && got2 < 0)) return;
        // the horse matte only fits the one held frame; if either part's drawn frame is not that one yet, cross-dissolve instead
        const held = horse && Math.abs(got1 - TAKE_CUT[0]) < 0.03 && Math.abs(got2 - TAKE_CUT[1]) < 0.03;
        // before the bridge only part one is on screen, after it only part two, during it both
        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, T >= 1 ? vtex2 : vtex);
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, T > 0 ? vtex2 : vtex);
        gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, vtex); gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, horse ? horse.t : vtex);
        const mid = T > 0 && T < 1 ? T : 0, ksv = 0.3 + 0.7 * ss(0, 0.7, mid);
        gl.uniform1i(U.ta, 0); gl.uniform1i(U.tb, 1); gl.uniform1i(U.tf, 2); gl.uniform1i(U.tk, 3);
        gl.uniform2f(U.res, w, h);
        gl.uniform2f(U.sa, vid.videoWidth, vid.videoHeight); gl.uniform2f(U.sb, vid.videoWidth, vid.videoHeight);
        gl.uniform2f(U.fa, 0.5, 0.5); gl.uniform2f(U.fb, 0.5, 0.5); gl.uniform2f(U.pc, 0.5, 0.46);
        gl.uniform2f(U.m, 0.35 * (cv2.x + (REDUCED ? 0 : Math.sin(tv * 0.4) * 0.14)), 0.35 * (cv2.y + (REDUCED ? 0 : Math.cos(tv * 0.31) * 0.1)));
        // the horse grows about a point off the right edge, so it gets bigger and leaves to the left, as if the camera passed it
        gl.uniform1f(U.za, 1.03); gl.uniform1f(U.zb, 1.03); gl.uniform1f(U.lay, 0); gl.uniform1f(U.fl, 1);
        gl.uniform1f(U.br, held ? mid : -mid); gl.uniform2f(U.ff, 1.25, 0.55); gl.uniform1f(U.zf, 1 + 2.1 * mid * mid);
        gl.uniform1f(U.mx, 0); gl.uniform1f(U.ks, 1); gl.uniform1f(U.cs, 1); gl.uniform1f(U.pr, 0); gl.uniform1f(U.tm, tv % 600);
        gl.uniform3f(U.ma, 1, 0.98, 0.94); gl.uniform3f(U.mb, 0.93, 0.97, 1);
        gl.uniform1f(U.en, ss(0, 1, (p - 0.95) / 0.05));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (!shown) { shown = true; setDepth(true); }
        return;
      }
      const xx = xRef.current, a = Math.min(N - 1, Math.max(0, Math.floor(xx - 0.75))), b = Math.min(N - 1, a + 1);
      if (!tex[a] || !tex[b]) return;
      // T: how far through the portal we are. The next world opens as a small window at this world's focus point and grows until it is the screen.
      const T = b === a ? 0 : c01((xx - (b + 0.15)) / 0.6);
      const rs = w / h, ri = tex[a].w / tex[a].h, sx = rs > ri ? 1 : rs / ri, sy = rs > ri ? ri / rs : 1;
      const pcx = Math.min(0.8, Math.max(0.2, (GAMES[a].focus[0] - 0.5) / sx + 0.5)), pcy = Math.min(0.8, Math.max(0.2, (GAMES[a].focus[1] - 0.5) / sy + 0.5));
      const ks = 0.3 + 0.7 * ss(0, 0.7, T);
      gl.uniform2f(U.pc, pcx, pcy);
      gl.uniform1f(U.ks, ks);
      gl.uniform1f(U.cs, ss(0.35, 1, T));
      gl.uniform1f(U.pr, ks * 0.4 * ss(0, 0.12, T) + 1.6 * ss(0.5, 1, T));
      const t = (performance.now() - t0) / 1000, c = cur.current;
      const la = ext[a], z0 = zoom(a, xx);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, (la ? la.back : tex[a]).t); gl.uniform1i(U.ta, 0);
      gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, tex[a].t); gl.uniform1i(U.tf, 2);
      gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, (la ? la.mask : tex[a]).t); gl.uniform1i(U.tk, 3);
      gl.uniform1f(U.lay, la ? 1 : 0); gl.uniform1f(U.zf, z0 + 1.25 * (z0 - 1.06));
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tex[b].t); gl.uniform1i(U.tb, 1);
      gl.uniform2f(U.res, w, h);
      gl.uniform2f(U.sa, tex[a].w, tex[a].h); gl.uniform2f(U.sb, tex[b].w, tex[b].h);
      gl.uniform2f(U.fa, GAMES[a].focus[0], GAMES[a].focus[1]); gl.uniform2f(U.fb, GAMES[b].focus[0], GAMES[b].focus[1]);
      // pointer plus a slow drift of its own, so the world keeps breathing when the mouse is still
      gl.uniform2f(U.m, c.x + (REDUCED ? 0 : Math.sin(t * 0.4) * 0.14), c.y + (REDUCED ? 0 : Math.cos(t * 0.31) * 0.1));
      gl.uniform1f(U.za, zoom(a, xx)); gl.uniform1f(U.zb, zoom(b, xx));
      gl.uniform3fv(U.ma, GAMES[a].mist); gl.uniform3fv(U.mb, GAMES[b].mist);
      gl.uniform1f(U.en, ss(0, 1, (xx - (N + 0.02)) / 0.48));
      gl.uniform1f(U.mx, T); gl.uniform1f(U.fl, 0); gl.uniform1f(U.br, 0);
      gl.uniform1f(U.tm, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const ready = () => { if (--left === 0) { if (!TAKE) setDepth(true); if (!raf) draw(); } };
    const load = (src, put) => {
      const im = new Image();
      im.onload = () => {
        if (!alive) return;
        const t = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        put({ t, w: im.naturalWidth, h: im.naturalHeight });
        ready();
      };
      // a picture that fails to load must not hold the film back: the take falls back to a plain dissolve without its matte
      im.onerror = () => { if (alive) ready(); };
      im.src = src;
    };
    let horse = null;
    if (TAKE) { left++; load(A + 'hero-take-horse.png', (v) => { horse = v; }); }
    // the film never shows the game backgrounds, so it does not wait for them
    if (!TAKE) GAMES.forEach((g, n) => {
      load(g.scene || g.image, (v) => { tex[n] = v; });
      if (g.layers) { const e = {}; ext[n] = e; load(g.layers.back, (v) => { e.back = v; }); load(g.layers.mask, (v) => { e.mask = v; }); }
    });
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => { vis = es[es.length - 1].isIntersecting; if (vis) snap = true; if (vis && alive && !raf && left === 0) draw(); }) : null;
    if (io) io.observe(cv);
    // if the browser takes the GL context away, stop drawing and bring the poster back instead of leaving a blank stage
    const lost = () => { alive = false; if (raf) cancelAnimationFrame(raf); raf = 0; setDepth(false); };
    cv.addEventListener('webglcontextlost', lost);
    return () => { alive = false; if (raf) cancelAnimationFrame(raf); if (io) io.disconnect(); cv.removeEventListener('webglcontextlost', lost); };
  }, []);
  const jump = (n) => {
    if (!track.current) return;
    window.scrollTo({ top: window.scrollY + track.current.getBoundingClientRect().top - NAV + span() * (TAKE ? TAKE_JUMP[n] : (n + 1) / END), behavior: 'smooth' });
  };
  const intro = 1 - c01(x / 0.45);
  const active = x < 0.5 ? -1 : Math.min(N - 1, Math.max(0, Math.round(x - 1)));
  const titleO = (n) => c01((x - (n + 0.6)) / 0.25) * (1 - c01((x - (n + 1.2)) / 0.2));
  return (
    <section ref={track} style={{ position: 'relative', height: REDUCED ? 'auto' : 'calc(' + STAGE_H + ' * ' + (TAKE ? TAKE_SCREENS + 1 : END + 0.6) + ')', background: 'var(--paper)' }}>
      {/* with reduced motion on a tall screen the stage is just the picture: there are no titles to keep room for underneath */}
      <div ref={stage} onMouseMove={move} onMouseLeave={() => aim(0, 0)} style={{ '--mx': 0, '--my': 0, position: REDUCED ? 'relative' : 'sticky', top: REDUCED ? 0 : NAV, height: REDUCED && tall ? 'min(120vw, ' + STAGE_H + ')' : STAGE_H, overflow: 'hidden', background: TAKE ? 'var(--paper)' : 'var(--ink-900)', color: '#fff' }}>
        {/* the world: follows the pointer (outer), drifts on its own (inner), and is pushed into by scroll (art layers) */}
        <canvas ref={canvas} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: FILM_H, display: 'block', opacity: depth ? 1 : 0, zIndex: depth ? 0 : -1 }}></canvas>
        {/* fallback when WebGL is unavailable: the same art as flat layers. Without the film the poster fades to paper over the
            last tenth of the hero, as the film's own clouds do, so the outro that rises over the stage there never covers it */}
        {TAKE ? <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: FILM_H, background: 'url(' + A + 'hero-take-poster.jpg) center / cover', visibility: depth ? 'hidden' : 'visible', opacity: REDUCED ? 1 : 'clamp(0, calc((0.9 - var(--take-p, 0)) * 16), 1)' }}></div> : null}
        <div aria-hidden="true" style={{ position: 'absolute', inset: -48, transform: par(-34, -22), willChange: 'transform', visibility: depth ? 'hidden' : 'visible', display: TAKE ? 'none' : 'block' }}>
          <div style={{ position: 'absolute', inset: 0, animation: REDUCED ? 'none' : 'bt-drift 22s ease-in-out infinite alternate' }}>
            {GAMES.map((g, n) => (
              <div key={g.title} style={{ position: 'absolute', inset: 0, background: 'url(' + (g.scene || g.image) + ') center / cover', willChange: 'transform, opacity',
                opacity: n === 0 ? 1 : c01((x - (n + 0.3)) / 0.4), transform: 'scale(' + (1 + 0.25 * Math.max(0, x - (n === 0 ? 0 : n + 0.3))) + ')' }}></div>
            ))}
          </div>
        </div>
        {/* floating motes sit nearer the camera, so they move further than the art */}
        {REDUCED || TAKE ? null : (
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, transform: par(-70, -46), pointerEvents: 'none' }}>
            {Array.from({ length: 18 }, (_, k) => {
              const d = 3 + (k * 7) % 5;
              return <span key={k} style={{ position: 'absolute', left: ((k * 37 + 11) % 100) + '%', top: (18 + (k * 53) % 74) + '%', width: d, height: d, borderRadius: '50%', background: k % 3 === 0 ? 'var(--gold-500)' : '#fff', opacity: 0, animation: 'bt-mote ' + (6 + (k * 5) % 7) + 's ' + (-(k * 1.3) % 9) + 's linear infinite' }}></span>;
            })}
          </div>
        )}
        {/* soft light that follows the pointer */}
        {REDUCED || TAKE ? null : <div aria-hidden="true" style={{ position: 'absolute', left: 'calc(50% + var(--mx) * 100%)', top: 'calc(50% + var(--my) * 100%)', width: 620, height: 620, margin: '-310px 0 0 -310px', borderRadius: '50%', pointerEvents: 'none', mixBlendMode: 'soft-light', background: 'radial-gradient(closest-side, rgba(255,255,255,.55), rgba(255,255,255,0))' }}></div>}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--ink-900)', display: TAKE ? 'none' : 'block', opacity: 0.62 * (1 - c01(x / 0.6)) }}></div>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,35,59,.88) 0%, rgba(20,35,59,.45) 28%, rgba(20,35,59,0) 58%)', display: TAKE ? 'none' : 'block', opacity: 1 - c01((x - (N - 0.05)) / 0.3) }}></div>

        <div style={{ ...wrap, position: 'absolute', inset: 0, display: TAKE ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: 96,
          opacity: intro, transform: 'translateY(' + (-x * 90) + 'px)', pointerEvents: intro > 0.5 ? 'auto' : 'none', visibility: intro > 0 ? 'visible' : 'hidden' }}>
          <div style={{ animation: 'bt-drop 500ms var(--ease-out) both' }}><Badge tone="orange">Game development studio · Berkeley, CA</Badge></div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px, 6.4vw, 88px)', lineHeight: 1.02, letterSpacing: 'var(--tracking-display)', margin: '20px 0 0', maxWidth: 980, transform: par(18, 12), display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.26em', textShadow: '0 4px 0 rgba(6,13,24,.55)' }}>
            {HEADLINE.map((w, n) => <span key={n} style={{ display: 'inline-block', transformOrigin: 'left bottom', animation: 'bt-word 600ms ' + (150 + n * 80) + 'ms var(--ease-bounce) both' }}>{w}</span>)}
          </h1>
          <p style={{ fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.6, margin: '20px 0 32px', maxWidth: 620, color: '#fff', animation: 'bt-fade 600ms 750ms both' }}>From the kitchen drama of Rich Revenge to the strategic depths of Realm Defense and the fast-paced action of Draft Wars, Babeltime crafts intuitive, fun games for heroes everywhere.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ animation: 'bt-drop 520ms 900ms var(--ease-out) both' }}><Button size="lg" iconRight="→" {...link('Games')}>Explore our games</Button></div>
            <div style={{ animation: 'bt-drop 520ms 1020ms var(--ease-out) both' }}><Button size="lg" variant="light" {...link('Jobs')}>Join our team</Button></div>
          </div>
        </div>

        <div style={{ ...wrap, position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 var(--gutter) clamp(28px, 4vw, 48px)', display: TAKE ? 'none' : 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', flex: '1 1 380px', minWidth: 0, minHeight: REDUCED ? 0 : 'clamp(190px, 26vw, 260px)' }}>
            {REDUCED ? null : GAMES.map((g, n) => {
              const o = c01((x - (n + 0.6)) / 0.25) * (1 - c01((x - (n + 1.2)) / 0.2));
              return (
                <div key={g.title} aria-hidden={o < 0.5} style={{ position: 'absolute', left: 0, bottom: 0, maxWidth: 620, opacity: o, transform: 'translateY(' + ((1 - c01((x - (n + 0.6)) / 0.25)) * 36 - c01((x - (n + 1.2)) / 0.2) * 36) + 'px)', pointerEvents: o > 0.5 ? 'auto' : 'none', visibility: o > 0 ? 'visible' : 'hidden' }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{g.isNew ? <Badge tone="gold">New</Badge> : null}<Badge tone="solid">{g.genre}</Badge></div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px, 6.4vw, 88px)', lineHeight: 1, letterSpacing: 'var(--tracking-display)', color: '#fff', margin: '14px 0 0', textShadow: '0 5px 0 rgba(6,13,24,.6)' }}>{g.short}</h2>
                  <p style={{ fontSize: 'clamp(17px, 1.7vw, 22px)', lineHeight: 1.4, color: '#fff', margin: '12px 0 22px' }}>{g.tagline}</p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{cta(g, 'md', 'light')}</div>
                </div>
              );
            })}
          </div>
          {REDUCED ? null : (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', opacity: 1 - c01((x - (N + 0.1)) / 0.2), visibility: x < N + 0.3 ? 'visible' : 'hidden' }}>
              {GAMES.map((g, n) => {
                const on = n === active;
                return (
                  <button key={g.title} onClick={() => jump(n)} aria-pressed={on} aria-label={'Show ' + g.short}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: on ? '6px 18px 6px 6px' : 6, minHeight: 52, borderRadius: 'var(--radius-pill)', cursor: 'pointer', font: 'inherit', textAlign: 'left',
                      background: on ? '#fff' : 'var(--ink-700)', color: 'var(--ink-900)', border: '2px solid ' + (on ? '#fff' : 'var(--ink-500)'),
                      boxShadow: '0 ' + (on ? 2 : 5) + 'px 0 ' + (on ? g.accent : '#060d18'), transform: 'translateY(' + (on ? 3 : 0) + 'px)', transition: 'all var(--dur-base) var(--ease-out)' }}>
                    <span style={{ width: 36, height: 36, borderRadius: '50%', flex: 'none', background: 'url(' + g.image + ') center / cover', border: '2px solid ' + (on ? g.accent : '#fff') }}></span>
                    {on ? <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, whiteSpace: 'nowrap' }}>{g.short}</span> : null}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {REDUCED ? null : (
          <div aria-hidden="true" style={{ position: 'absolute', left: '50%', bottom: 'clamp(28px, 4vw, 48px)', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: intro, visibility: intro > 0 ? 'visible' : 'hidden', pointerEvents: 'none' }}>
            <span style={{ width: 24, height: 38, borderRadius: 'var(--radius-pill)', border: '2px solid ' + (tall ? 'var(--ink-700)' : '#fff'), display: 'flex', justifyContent: 'center', paddingTop: 6 }}><span style={{ width: 4, height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--orange-500)', animation: 'bt-cue 1400ms var(--ease-out) infinite' }}></span></span>
            <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: tall ? 'var(--ink-700)' : '#fff' }}>Scroll to explore</span>
          </div>
        )}
        {/* on the film, type is part of the picture: one large title per game, nothing else laid over it */}
        {TAKE && !REDUCED ? GAMES.map((g, n) => {
          const tin = c01((x - (n + 0.6)) / 0.25), o = titleO(n);
          return (
            <div key={g.title} aria-hidden={o < 0.5} style={{ position: 'absolute', left: 'max(var(--gutter), calc((100% - var(--container)) / 2 + var(--gutter)))', right: 'var(--gutter)', top: tall ? 'calc(' + FILM_H + ' + 24px)' : 'auto', bottom: tall ? 'auto' : 'clamp(20px, 9%, 120px)', pointerEvents: 'none', opacity: o, visibility: o > 0 ? 'visible' : 'hidden', transform: 'translateY(' + ((1 - tin) * 30) + 'px)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: tall ? 'clamp(40px, 13vw, 72px)' : 'clamp(34px, 10vw, 164px)', lineHeight: 0.92, letterSpacing: '-0.01em', color: tall ? 'var(--ink-900)' : '#fff', margin: 0, textShadow: tall ? 'none' : '0 2px 28px rgba(20,35,59,.4)' }}>{g.short}</h2>
              <p style={{ fontSize: 'clamp(16px, 1.5vw, 22px)', lineHeight: 1.4, color: tall ? 'var(--ink-700)' : '#fff', margin: tall ? '12px 0 0' : '16px 0 0', textShadow: tall ? 'none' : '0 1px 12px rgba(20,35,59,.55)' }}>{g.tagline}</p>
            </div>
          );
        }) : null}
        {/* the worlds float above the clouds: two cloud banks rise at different speeds and become the paper ground of Featured Games (only when the shader, which draws its own cloud, is unavailable) */}
        {REDUCED || depth || TAKE ? null : [
          { h: '46%', w: 180, t: 64, k: c01((x - (N + 0.05)) / 0.4), fill: 'rgba(255,255,255,.62)', dx: -40 },
          { h: '26%', w: 124, t: 48, k: c01((x - (N + 0.15)) / 0.35), fill: '#F6F9FC', dx: -16 },
        ].map((cl, n) => (
          <div key={n} aria-hidden="true" style={{ position: 'absolute', left: -60, right: -60, bottom: -2, height: cl.h, pointerEvents: 'none', willChange: 'transform', transform: 'translateY(' + ((1 - cl.k) * 102) + '%) translateX(calc(var(--mx) * ' + cl.dx + 'px))' }}>
            <div style={{ height: cl.t, background: 'radial-gradient(' + (cl.w * 0.62) + 'px ' + cl.t + 'px at 50% 100%, ' + cl.fill + ' 98%, rgba(255,255,255,0)) ' + (n * 40) + 'px 0 / ' + cl.w + 'px ' + cl.t + 'px repeat-x' }}></div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: cl.t, bottom: 0, background: cl.fill }}></div>
          </div>
        ))}
      </div>
    </section>
  );
}
// Previous hero (side-by-side copy and framed art), kept so it can be switched back: render <HeroClassic go={go} /> in App.
function HeroClassic({ go }) {
  const [i, setI] = React.useState(0);
  const [auto, setAuto] = React.useState(!REDUCED);
  const [hov, setHov] = React.useState(-1);
  React.useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setI((n) => (n + 1) % GAMES.length), 6000);
    return () => clearInterval(id);
  }, [auto]);
  const game = GAMES[i];
  const pick = (n) => { setAuto(false); setI(n); };
  return (
    <section onMouseEnter={() => setAuto(false)} style={{ position: 'relative', background: 'var(--ink-900)', color: '#fff', overflow: 'hidden' }}>
      {GAMES.map((g, n) => <div key={g.title} aria-hidden="true" style={{ position: 'absolute', inset: -40, background: 'url(' + g.image + ') center / cover', filter: 'blur(36px) saturate(1.2)', opacity: n === i ? 0.3 : 0, transition: 'opacity 700ms var(--ease-out)' }}></div>)}
      <div style={{ ...wrap, position: 'relative', padding: 'clamp(40px, 6vw, 80px) var(--gutter) 0', display: 'flex', gap: 'clamp(28px, 4vw, 56px)', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 380px', minWidth: 0 }}>
          <div style={{ animation: 'bt-drop 500ms var(--ease-out) both' }}><Badge tone="orange">Game development studio · Berkeley, CA</Badge></div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px, 5.4vw, 72px)', lineHeight: 1.04, letterSpacing: 'var(--tracking-display)', margin: '20px 0 0', display: 'flex', flexWrap: 'wrap', gap: '0 0.26em' }}>
            {HEADLINE.map((w, n) => <span key={n} style={{ display: 'inline-block', transformOrigin: 'left bottom', animation: 'bt-word 600ms ' + (150 + n * 80) + 'ms var(--ease-bounce) both' }}>{w}</span>)}
          </h1>
          <p style={{ fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.6, margin: '20px 0 32px', maxWidth: 520, color: '#fff', animation: 'bt-fade 600ms 750ms both' }}>From the kitchen drama of Rich Revenge to the strategic depths of Realm Defense and the fast-paced action of Draft Wars, Babeltime crafts intuitive, fun games for heroes everywhere.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ animation: 'bt-drop 520ms 900ms var(--ease-out) both' }}><Button size="lg" iconRight="→" {...link('Games')}>Explore our games</Button></div>
            <div style={{ animation: 'bt-drop 520ms 1020ms var(--ease-out) both' }}><Button size="lg" variant="light" {...link('Jobs')}>Join our team</Button></div>
          </div>
        </div>
        <HeroFrame game={game} />
      </div>
      <div style={{ ...wrap, position: 'relative', padding: 'clamp(28px, 4vw, 44px) var(--gutter) clamp(36px, 5vw, 56px)', display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        {GAMES.map((g, n) => {
          const on = n === i, up = hov === n && !on;
          return (
            <button key={g.title} onClick={() => pick(n)} onMouseEnter={() => setHov(n)} onMouseLeave={() => setHov(-1)} aria-pressed={on}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 20px 8px 8px', minHeight: 60, borderRadius: 'var(--radius-pill)', cursor: 'pointer', font: 'inherit', textAlign: 'left',
                background: on ? '#fff' : 'var(--ink-700)', color: on ? 'var(--ink-900)' : '#fff', border: '2px solid ' + (on ? '#fff' : 'var(--ink-500)'),
                boxShadow: '0 ' + (on ? 2 : up ? 7 : 5) + 'px 0 ' + (on ? g.accent : '#060d18'), transform: 'translateY(' + (on ? 3 : up ? -2 : 0) + 'px)',
                transition: 'all var(--dur-fast) var(--ease-out)', animation: 'bt-drop 520ms ' + (1150 + n * 90) + 'ms var(--ease-out) backwards' }}>
              <span style={{ width: 44, height: 44, borderRadius: '50%', flex: 'none', background: 'url(' + g.image + ') center / cover', border: '2px solid ' + (on ? g.accent : '#fff') }}></span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, whiteSpace: 'nowrap' }}>{g.short}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
// After the film: the studio's own words and the two ways in, set on the paper the clouds turn into.
// on: the hero is at least 95% through, so the outro is showing and may take clicks and taps
function HeroOutro({ go, on }) {
  return (
    // While it is (nearly) invisible it takes no clicks or taps (on a tall screen it sits in plain view under the capped stage),
    // and a keyboard user who tabs into it early is scrolled to its top, which is always past the end of the hero, so it shows
    // in full. It stays in the accessibility tree throughout: it holds the home page's only visible h1.
    <section onFocus={on ? undefined : (e) => e.currentTarget.scrollIntoView({ block: 'start' })} style={{ ...wrap, padding: '0 var(--gutter)', position: 'relative', zIndex: 2, scrollMarginTop: NAV,
      // pulled up over the lower half of the hero's last, all-white screen (the film's clouds, or the poster once it has faded
      // to paper), which halves the empty stretch after the clouds. This layout never changes while the page is open, so nothing
      // below jumps when the film arrives late or its GL context is lost. It stays invisible until the clouds have started, so
      // it never sits on top of the picture.
      marginTop: REDUCED ? 'clamp(48px, 7vw, 96px)' : 'calc(' + STAGE_H + ' * -0.5)', opacity: REDUCED ? 1 : 'clamp(0, calc((var(--take-p, 1) - 0.9) * 12), 1)',
      pointerEvents: on ? undefined : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Badge tone="orange">Game development studio · Berkeley, CA</Badge>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.04, letterSpacing: 'var(--tracking-display)', color: 'var(--ink-900)', margin: '24px 0 0', maxWidth: 940 }}>Creating worlds you’ll love to inhabit.</h1>
        <p style={{ fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.6, color: 'var(--ink-700)', margin: '24px 0 32px', maxWidth: 640 }}>From the kitchen drama of Rich Revenge to the strategic depths of Realm Defense and the fast-paced action of Draft Wars, Babeltime crafts intuitive, fun games for heroes everywhere.</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button size="lg" iconRight="→" {...link('Games')}>Explore our games</Button>
          <Button size="lg" variant="dark" {...link('Jobs')}>Join our team</Button>
        </div>
      </div>
    </section>
  );
}
function DepthCard({ game, go }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });
  const [press, setPress] = React.useState(false);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    setT(REDUCED ? { rx: 0, ry: 0, gx: 50, gy: 50, on: true } : { rx: (0.5 - py) * 9, ry: (px - 0.5) * 12, gx: px * 100, gy: py * 100, on: true });
  };
  const leave = () => { setT({ rx: 0, ry: 0, gx: 50, gy: 50, on: false }); setPress(false); };
  const tr = t.on ? '90ms linear' : '600ms var(--ease-bounce)';
  const zt = 'transform ' + (t.on ? '260ms var(--ease-out)' : '600ms var(--ease-bounce)');
  // scale cancels the perspective magnification, so layers part on tilt but never grow past the frame
  const z = (n) => (REDUCED || !t.on ? 'none' : 'translateZ(' + n + 'px) scale(' + (1 - n / 900) + ')');
  const ledge = press ? 2 : t.on ? 12 : 8;
  const store = game.href && game.href.indexOf('play.google') > -1;
  const Tag = game.page || game.href ? 'a' : 'div';
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      {/* the anchor is the hit box and never moves; the card inside it tilts and presses, so a click near an edge is not lost */}
      <Tag ref={ref} {...(game.page ? link(game.page) : { href: game.href })} aria-label={game.title} onMouseMove={move} onMouseLeave={leave} onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
        style={{ flex: 1, minWidth: 0, display: 'flex', textDecoration: 'none', cursor: 'pointer', perspective: 900 }}>
      <div style={{ position: 'relative', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', transformStyle: 'preserve-3d',
          transform: 'translateY(' + (press ? 6 : t.on ? -6 : 0) + 'px) rotateX(' + t.rx + 'deg) rotateY(' + t.ry + 'deg)', transition: 'transform ' + (press ? '90ms var(--ease-out)' : tr) }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-xl)', background: '#fff', transition: 'box-shadow 200ms var(--ease-out)',
          boxShadow: 'inset 0 0 0 ' + (t.on ? 4 : 0) + 'px ' + game.accent + ', 0 ' + ledge + 'px 0 ' + game.accent + ', 0 ' + (t.on ? 34 : 14) + 'px ' + (t.on ? 56 : 30) + 'px rgba(20,35,59,' + (t.on ? 0.22 : 0.12) + ')' }}></div>
        <div style={{ position: 'relative', margin: 4, borderRadius: '24px 24px 0 0', overflow: 'hidden', aspectRatio: '16 / 9', background: 'var(--sky-100)' }}>
          <div style={{ position: 'absolute', inset: -22, background: 'url(' + game.image + ') center / cover', transform: 'translate(' + (t.ry * -1.3) + 'px,' + (t.rx * 1.3) + 'px) scale(' + (t.on ? 1.06 : 1) + ')', transition: 'transform ' + (t.on ? '260ms var(--ease-out)' : tr) }}></div>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: t.on && !REDUCED ? 1 : 0, transition: 'opacity 300ms', background: 'radial-gradient(circle at ' + t.gx + '% ' + t.gy + '%, rgba(255,255,255,.32), rgba(255,255,255,0) 45%)' }}></div>
        </div>
        <div style={{ position: 'absolute', left: 18, top: 18, display: 'flex', gap: 8, flexWrap: 'wrap', transform: z(30), transition: zt }}>{game.isNew ? <Badge tone="gold">New</Badge> : null}<Badge tone="solid">{game.genre}</Badge></div>
        <div style={{ position: 'relative', flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', transformStyle: 'preserve-3d' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, lineHeight: 1.1, color: 'var(--ink-900)', margin: 0, transform: z(48), transition: zt }}>{game.short}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-700)', margin: 0, textWrap: 'pretty', transform: z(22), transition: zt }}>{game.description}</p>
          <div style={{ alignSelf: 'stretch', marginTop: 'auto', paddingTop: 8, position: 'relative', minHeight: 52, display: 'flex', alignItems: 'center', transform: z(36), transition: zt }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'nowrap', overflow: 'hidden', minWidth: 0, maxWidth: 'calc(100% - 56px)', opacity: t.on ? 0 : 1, transition: 'opacity 180ms' }}>{(game.platforms || []).map((p) => <Badge key={p} tone="neutral">{p}</Badge>)}</div>
            <div style={{ display: 'flex', alignItems: 'center', height: 44, minWidth: 44, justifyContent: 'center', padding: t.on ? '0 16px' : '0', borderRadius: 'var(--radius-pill)', position: 'absolute', right: 0, bottom: 0, maxWidth: '100%',
              background: t.on ? game.accent : 'var(--ink-100)', color: 'var(--ink-900)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, whiteSpace: 'nowrap', transition: 'background 200ms, padding 260ms var(--ease-out)' }}>
              <span style={{ maxWidth: t.on ? 200 : 0, opacity: t.on ? 1 : 0, overflow: 'hidden', transition: 'max-width 300ms var(--ease-out), opacity 200ms' }}>{game.page ? 'View game' : store ? 'Get it on Google Play' : 'View game'}&nbsp;&nbsp;</span>
              <span aria-hidden="true" style={{ fontSize: 20, lineHeight: 1 }}>→</span>
            </div>
          </div>
        </div>
      </div>
      </Tag>
    </div>
  );
}
function Reveal({ children, delay = 0, basis = '340px' }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(REDUCED || !('IntersectionObserver' in window));
  React.useEffect(() => {
    if (seen) return;
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  // until it has been revealed the card is invisible, so it must not take taps or clicks either
  return <div ref={ref} style={{ display: 'flex', flex: '1 1 ' + basis, maxWidth: basis === '100%' ? undefined : 400, minWidth: 0, pointerEvents: seen ? undefined : 'none', opacity: seen ? 1 : 0, transform: seen ? 'none' : 'perspective(1100px) rotateY(-38deg) rotateZ(-5deg) scale(.86)', transition: 'opacity 600ms ' + delay + 'ms var(--ease-out), transform 700ms ' + delay + 'ms var(--ease-bounce)' }}>{children}</div>;
}
// headingAs: 'h1' when the section is the whole page (games.html); on the home page it is a section under the page's own h1
function Games({ featured, go, headingAs }) {
  return (
    <section id="games" style={{ ...wrap, padding: 'clamp(64px, 9vw, 96px) var(--gutter)', scrollMarginTop: NAV }}>
      <SectionHeading as={headingAs} eyebrow="The Library" title="Featured Games" description="Immerse yourself in epic adventures crafted with passion and precision." align="center" />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginTop: 48 }}>
        {GAMES.map((g, n) => <Reveal key={g.title} delay={n * 120} basis={featured ? '100%' : '340px'}>{featured ? <Tilt><GameCard {...g} layout="horizontal" style={{ width: '100%' }} /></Tilt> : <DepthCard game={g} go={go} />}</Reveal>)}
      </div>
    </section>
  );
}
function About() {
  return (
    <section id="about" style={{ background: 'var(--ink-900)', scrollMarginTop: NAV }}>
      <div style={{ ...wrap, padding: 'clamp(64px, 9vw, 96px) var(--gutter)', display: 'flex', gap: 'clamp(32px, 6vw, 64px)', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 420px' }}>
          <SectionHeading inverse eyebrow="Babeltime Inc." title="A legacy of pure fun" />
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-200)', margin: '24px 0 0' }}>Babeltime is a game development studio based in Berkeley, California. We are focused on making the greatest strategy games around. Our first game, Realm Defense, blends addicting tower defense and incredible heroes for hours of fun and strategy.</p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-200)', margin: '16px 0 0' }}>We were formed by a diverse group of developers from across the games industry and the indie community — making fun, intuitive games that we personally love to play.</p>
        </div>
        <div style={{ flex: '0 1 320px', display: 'flex', gap: 48, flexWrap: 'wrap', padding: 32, borderRadius: 'var(--radius-xl)', border: '2px solid var(--ink-700)' }}>
          <Stat value="2015" label="Founded" tone="inverse" /><Stat value="3" label="Games" tone="inverse" />
        </div>
      </div>
    </section>
  );
}
function HireBand({ go }) {
  return (
    <section style={{ background: 'var(--orange-500)' }}>
      <div style={{ ...wrap, padding: '64px var(--gutter)', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.1, color: 'var(--ink-900)', margin: 0 }}>Build the next world with us.</h2>
        <Button variant="dark" size="lg" iconRight="→" {...link('Contact')}>Send your portfolio</Button>
      </div>
    </section>
  );
}
function Jobs({ go }) {
  // There are no open roles right now (matches babeltimeca.com/jobs.html). Nothing here should read as a live listing.
  return (
    <section style={{ ...wrap, padding: 'clamp(64px, 9vw, 96px) var(--gutter)' }}>
      <SectionHeading as="h1" eyebrow="Jobs" title="Join the adventure" description="Shape the future of strategy games with us." align="center" />
      <div style={{ margin: '48px auto 0', maxWidth: 760, padding: 'clamp(24px, 4vw, 48px)', background: '#fff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
        <Badge tone="neutral">Current openings</Badge>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 3.4vw, 36px)', lineHeight: 1.1, color: 'var(--ink-900)', margin: 0 }}>No open roles right now.</h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-700)', margin: 0, maxWidth: 620 }}>We’re always glad to meet passionate game developers. Send us your portfolio, and our recruiter will reach out as new roles open up.</p>
        <Button iconRight="→" {...link('Contact')} style={{ marginTop: 8 }}>Send your portfolio</Button>
      </div>
    </section>
  );
}
// One dedicated page per game, built from the facts on the live site's game pages.
const PAGES = {
  // Rich Revenge has no page on the live site. The story line is the studio's own; the character notes and the three
  // "how it plays" points are written from that one line and the game's art, so check them against the game before launch.
  'Rich Revenge': { game: GAMES[0], badge: 'New · Merge & Story', headline: 'Revenge is on the menu.',
    lead: 'The Riches Equestrian Club has a new cook, and her secret ingredient is revenge.',
    stores: GAMES[0].stores,
    about: { eyebrow: 'The story', title: 'A family home, a family secret', body: 'Emma takes a job in the kitchen of the Riches Equestrian Club with more than cooking on her mind. Help her merge her way to fine dining, reclaim her family home, and expose the Riches family, one dish at a time.' },
    castEyebrow: 'The club', castTitle: 'Everyone has something to hide',
    cast: [{ name: 'Emma', image: A + 'rr-emma.jpg', text: 'The new cook. Sharp eyes, steady hands, and a plan she is keeping to herself.' },
      { name: 'Goldie', image: A + 'rr-goldie.jpg', text: 'Pearls, furs and a short temper. Very little at the club gets past her.' },
      { name: 'Malcolm', image: A + 'rr-malcolm.jpg', text: 'The rider in red. Arms crossed, always watching.' },
      { name: 'Cam', image: A + 'rr-cam.jpg', text: 'The stable hand with a ready thumbs-up and a box that always needs carrying.' },
      { name: 'Nelly', image: A + 'rr-nelly.jpg', text: 'Keeps the dining room running and worries about everything else.' }],
    gallery: { eyebrow: 'The club', title: 'Inside the Riches Equestrian Club', items: [{ image: A + 'rr-scene-kitchen.jpg', label: 'The kitchen' }, { image: A + 'rr-scene-dining.jpg', label: 'The dining room' }, { image: A + 'rr-scene-terrace.jpg', label: 'The terrace' }] },
    featEyebrow: 'How it plays', featTitle: 'Merge, reclaim, expose',
    feats: [{ t: 'Merge', d: 'Combine ingredients on the board and turn them into fine dining.' }, { t: 'Reclaim', d: 'Win back Emma’s family home, piece by piece.' }, { t: 'Expose', d: 'Follow the story and bring the Riches family’s secrets to light.' }] },
  'Realm Defense': { game: GAMES[1], badge: 'Tower Defense RPG', headline: 'Defend the realm.',
    lead: 'Join forces with legendary heroes to fight off waves of evil in this epic tower defense strategy game.',
    stores: [{ label: 'App Store', href: STORE.rdIos }, { label: 'Google Play', href: STORE.rdAndroid }], trailer: 'https://www.youtube.com/watch?v=qYq1mLKdHuk',
    about: { eyebrow: 'The conflict', title: 'Strategic tower defense RPG', body: 'Battle a diverse array of enemies across multiple environments. Place your towers well and use each hero’s unique abilities to protect the kingdom from total destruction.' },
    castEyebrow: 'The heroes', castTitle: 'Legendary heroes',
    cast: [{ name: 'Obsidian', image: A + 'rd-hero-obsidian.jpg', text: 'A large creature made of enchanted stone. Obsidian heard the cries of the surface people and came to help.' },
      { name: 'Mabyn', image: A + 'rd-hero-mabyn.jpg', text: 'A chaotic trickster who uses her jokes and bombs to keep the enemies at bay.' },
      { name: 'Smoulder', image: A + 'rd-hero-smoulder.jpg', text: 'A fiery dragon whose breath can incinerate even the toughest magical armor. The true master of aerial combat.' }],
    featEyebrow: 'Game features', featTitle: 'Built for strategists',
    feats: [{ t: 'Tactical', d: 'Dozens of towers and strategic upgrades.' }, { t: 'Powerful', d: 'Level up your heroes and unlock devastating skills.' }, { t: 'Epic', d: 'Conquer 100+ levels across unique environments.' }] },
  'Draft Wars': { game: GAMES[2], badge: 'Available in limited regions', headline: 'Aeon of chaos.',
    lead: 'Assemble your squad, draft the best units, and dominate the battlefield in intense real-time strategic combat.',
    stores: [{ label: 'Google Play', href: STORE.dwAndroid }], trailer: 'https://www.youtube.com/watch?v=yftEEzlGVDg',
    about: { eyebrow: 'The story', title: 'A land of mysteries and magic', body: 'In the beginning, beings from different factions lived side by side in peace. It did not last. A war began in the shadows, as creatures of different origins fought to claim the land. Many millennia later, the conflict continues.' },
    castEyebrow: 'The factions', castTitle: 'Three factions, one battlefield',
    cast: [{ name: 'Humans', image: A + 'dw-humans-icon.png', text: 'The new-born civilization. Primitive, but discovering the true power of magic to conquer the unknown.' },
      { name: 'Monsters', image: A + 'dw-monsters-icon.png', text: 'The primal residents. Through millennia of evolution, they have started to wield magic with wild power.' },
      { name: 'Robots', image: A + 'dw-robots-icon.png', text: 'Mysterious remnants of a prehistoric civilization. Their origins are unknown, but their power is undeniable.' }],
    featEyebrow: 'Battle rules', featTitle: 'Three steps to victory',
    feats: [{ t: 'Build', d: 'Assemble your army from various unique units.' }, { t: 'Deploy', d: 'Select formations and deploy units round by round.' }, { t: 'Conquer', d: 'Destroy the enemy castle to claim victory.' }] },
};
function GamePage({ data, go }) {
  const g = data.game;
  const card = { background: '#fff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)' };
  return (
    <React.Fragment>
      <section style={{ background: 'var(--ink-900)', color: '#fff' }}>
        <div className="bt-grid" style={{ ...wrap, padding: 'clamp(48px, 7vw, 96px) var(--gutter)' }}>
          <div className="bt-c5" style={{ minWidth: 0 }}>
            <Badge tone="orange">{data.badge}</Badge>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(40px, 5.6vw, 76px)', lineHeight: 1.02, letterSpacing: 'var(--tracking-display)', margin: '24px 0 0' }}>{data.headline}</h1>
            <p style={{ fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.6, margin: '24px 0 32px', maxWidth: 520, color: '#fff' }}>{data.lead}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {data.stores.map((st, n) => <Button key={st.label} size="lg" variant={n === 0 ? 'primary' : 'light'} href={st.href} iconRight="→">{st.label}</Button>)}
              {data.trailer ? <Button size="lg" variant="light" href={data.trailer}>Watch trailer</Button> : null}
            </div>
          </div>
          <div className="bt-c7" style={{ minWidth: 0 }}>
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 8px 0 ' + g.accent, background: 'var(--ink-700)' }}>
              <img src={g.image} alt={g.title + ' key art'} style={{ display: 'block', width: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
      <section style={{ ...wrap, padding: 'clamp(64px, 9vw, 96px) var(--gutter) 0' }}>
        <SectionHeading eyebrow={data.about.eyebrow} title={data.about.title} />
        <p style={{ fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.7, color: 'var(--ink-700)', margin: '24px 0 0', maxWidth: 760 }}>{data.about.body}</p>
      </section>
      <section style={{ ...wrap, padding: 'clamp(64px, 9vw, 96px) var(--gutter)' }}>
        <SectionHeading eyebrow={data.castEyebrow} title={data.castTitle} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 24, marginTop: 48 }}>
          {data.cast.map((c) => (
            <div key={c.name} style={{ ...card, minWidth: 0, padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <img src={c.image} alt="" width="84" height="84" style={{ width: 84, height: 84, flex: 'none', borderRadius: 'var(--radius-lg)', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 5px 0 ' + g.accent + ', 0 0 0 2px var(--ink-100)' }} />
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, lineHeight: 1.1, color: 'var(--ink-900)', margin: '4px 0 8px' }}>{c.name}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--ink-700)', margin: 0 }}>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {data.gallery ? (
        <section style={{ ...wrap, padding: '0 var(--gutter) clamp(64px, 9vw, 96px)' }}>
          <SectionHeading eyebrow={data.gallery.eyebrow} title={data.gallery.title} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 24, marginTop: 48 }}>
            {data.gallery.items.map((it) => (
              <figure key={it.label} style={{ ...card, minWidth: 0, margin: 0, padding: 4, boxShadow: '0 6px 0 ' + g.accent + ', var(--shadow-card)' }}>
                <img src={it.image} alt={it.label} style={{ display: 'block', width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', borderRadius: '24px 24px 0 0' }} />
                <figcaption style={{ padding: '16px 24px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: 'var(--ink-900)' }}>{it.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}
      <section style={{ background: 'var(--ink-900)' }}>
        <div style={{ ...wrap, padding: 'clamp(64px, 9vw, 96px) var(--gutter)' }}>
          <SectionHeading inverse eyebrow={data.featEyebrow} title={data.featTitle} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 24, marginTop: 48 }}>
            {data.feats.map((f, n) => (
              <div key={f.t} style={{ minWidth: 0, padding: 32, borderRadius: 'var(--radius-xl)', border: '2px solid var(--ink-700)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: g.accent }}>{'0' + (n + 1)}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, lineHeight: 1.1, color: '#fff', margin: '8px 0 8px' }}>{f.t}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-200)', margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: 'var(--orange-500)' }}>
        <div style={{ ...wrap, padding: '64px var(--gutter)', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.1, color: 'var(--ink-900)', margin: 0 }}>{'Play ' + g.short + '.'}</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {data.stores.map((st) => <Button key={st.label} variant="dark" size="lg" href={st.href} iconRight="→">{st.label}</Button>)}
            <Button variant="light" size="lg" {...link('Games')}>All games</Button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
const MAILER = 'https://picx1a48o9.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer';
function Contact() {
  const [state, setState] = React.useState('idle'); // idle | sending | sent | failed
  // on success the form, and the focused Send button with it, is replaced by the note: focus moves to the note instead of
  // falling back to the page, so keyboard and screen-reader users hear it and keep their place
  const note = React.useRef(null);
  React.useEffect(() => { if (state === 'sent' && note.current) note.current.focus(); }, [state]);
  const submit = (e) => {
    e.preventDefault();
    if (state === 'sending') return;
    const f = e.target;
    setState('sending');
    fetch(MAILER, { method: 'POST', headers: { 'Accept': 'application/json; charset=utf-8', 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ name: f.elements.name.value, reply_to: f.elements.reply_to.value, message: f.elements.message.value }) })
      .then((r) => { setState(r.status === 200 ? 'sent' : 'failed'); }, () => setState('failed'));
  };
  return (
    <section style={{ ...wrap, padding: 'clamp(64px, 9vw, 96px) var(--gutter)' }}>
      <SectionHeading as="h1" eyebrow="Contact" title="Say hello" description="Questions about our games, press, or partnerships." align="center" />
      <p style={{ margin: '16px 0 0', fontSize: 17, color: 'var(--ink-700)', textAlign: 'center' }}>General inquiries: <a href="mailto:info@babeltimeus.com" style={{ fontWeight: 700 }}>info@babeltimeus.com</a></p>
      {state === 'sent' ? <p ref={note} tabIndex={-1} role="status" style={{ marginTop: 32, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, color: 'var(--grass-700)', textAlign: 'center' }}>Thanks for the message. We’ll be in touch shortly.</p> : (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '48px auto 0', maxWidth: 564, padding: 32, background: '#fff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)' }}>
          <Input label="Name" name="name" required autoComplete="name" placeholder="Your name" />
          <Input label="Email" name="reply_to" type="email" required autoComplete="email" placeholder="you@example.com" />
          <Input label="Message" name="message" required multiline placeholder="How can we help?" />
          {state === 'failed' ? <p role="alert" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--ruby-700)' }}>Something went wrong. Please try again, or email us directly.</p> : null}
          <Button busy={state === 'sending'} style={{ alignSelf: 'flex-start' }}>{state === 'sending' ? 'Sending…' : 'Send message'}</Button>
        </form>
      )}
    </section>
  );
}
function App() {
  const page = URLS[window.BT_PAGE] ? window.BT_PAGE : 'Home';
  const go = (p) => { window.location.href = url(p); };
  const [outro, setOutro] = React.useState(REDUCED);
  // old links to the home page's #games and #about still land on those sections once they exist. Only on a fresh visit: on a
  // reload or a Back/Forward the browser puts the reader back where they were, and that must win.
  React.useEffect(() => {
    const nav = window.performance && performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : null;
    if (nav && nav.type !== 'navigate') return;
    const el = window.location.hash.length > 1 && document.getElementById(window.location.hash.slice(1));
    if (el) el.scrollIntoView();
  }, []);
  return (
    <div>
      <NavBar logoSrc={A + 'babeltime-logo.png'} links={LINKS} active={PAGES[page] ? 'Games' : page} />
      {page === 'Home' ? <React.Fragment><Hero go={go} onOutro={setOutro} />{TAKE ? <HeroOutro go={go} on={outro} /> : null}<Games go={go} /><About /><HireBand go={go} /></React.Fragment> : null}
      {page === 'Games' ? <Games go={go} headingAs="h1" /> : null}
      {PAGES[page] ? <GamePage key={page} data={PAGES[page]} go={go} /> : null}
      {page === 'Jobs' ? <Jobs go={go} /> : null}
      {page === 'Contact' ? <Contact /> : null}
      <Footer logoSrc={A + 'babeltime-logo.png'} tagline="Creating worlds you’ll love to inhabit."
        columns={[{ title: 'Games', links: [{ label: 'Rich Revenge', ...link('Rich Revenge') }, { label: 'Realm Defense', ...link('Realm Defense') }, { label: 'Draft Wars', ...link('Draft Wars') }] }, { title: 'Studio', links: [{ label: 'Jobs', ...link('Jobs') }, { label: 'Contact', ...link('Contact') }] }]}
        logoHref={link('Home').href} onLogoClick={link('Home').onClick}
        copyright="© 2026 Babeltime Inc. All rights reserved." />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
