/* ============================================================
   Patas & Pelos Pet Shop — Layout global (layout.js)
   Injeta sprite de ícones, topbar, header, footer, menu mobile,
   drawer do carrinho, modal genérico, toasts e voltar ao topo.
   ============================================================ */
window.PS = window.PS || {};

PS.icon = function(name, cls){
  return '<svg class="ic ' + (cls || '') + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>';
};

PS.esc = function(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};

/* ------------------------- Sprite de ícones ------------------------- */
var SPRITE = '' +
'<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
'<symbol id="i-paw" viewBox="0 0 24 24"><ellipse cx="12" cy="15.8" rx="4.2" ry="3.4"/><circle cx="6.4" cy="11.2" r="2.2"/><circle cx="9.9" cy="7.5" r="2.2"/><circle cx="14.1" cy="7.5" r="2.2"/><circle cx="17.6" cy="11.2" r="2.2"/></symbol>' +
'<symbol id="i-dog" viewBox="0 0 24 24"><circle cx="12" cy="13.2" r="6"/><path d="M6.6 11.2C5.2 8.3 5.7 5.2 7.2 4.2c1.8 1 2.6 3.4 2.6 6"/><path d="M17.4 11.2c1.4-2.9.9-6-.6-7-1.8 1-2.6 3.4-2.6 6"/><circle cx="9.8" cy="12.7" r=".9"/><circle cx="14.2" cy="12.7" r=".9"/><path d="M11 16.4h2l-1 1.3z"/></symbol>' +
'<symbol id="i-cat" viewBox="0 0 24 24"><circle cx="12" cy="13.6" r="5.6"/><path d="M7.6 10.4L6.5 4.8 11.2 7.6"/><path d="M16.4 10.4l1.1-5.6-4.7 2.8"/><circle cx="9.9" cy="13.2" r=".9"/><circle cx="14.1" cy="13.2" r=".9"/><path d="M11.1 16.4h1.8l-.9 1.1z"/></symbol>' +
'<symbol id="i-bird" viewBox="0 0 24 24"><circle cx="11" cy="12" r="5.8"/><path d="M16.3 10.2l3.2-1.2-2.2 2.7z"/><path d="M7.5 13.5a3.6 3.6 0 0 0 3.2 3.5"/><circle cx="9.5" cy="10.6" r=".9"/><path d="M9.5 17.6L8.5 20M12.5 17.6l1 2.4"/></symbol>' +
'<symbol id="i-fish" viewBox="0 0 24 24"><ellipse cx="9.8" cy="12" rx="5.6" ry="4.2"/><path d="M15 12l4.7-3.2v6.4z"/><circle cx="7.8" cy="11.3" r=".9"/><path d="M9.8 7.8c.6-1.6 2-2.2 3.2-2.2"/></symbol>' +
'<symbol id="i-hamster" viewBox="0 0 24 24"><circle cx="12" cy="13" r="6.4"/><circle cx="6.3" cy="8.2" r="1.9"/><circle cx="17.7" cy="8.2" r="1.9"/><circle cx="9.6" cy="12.5" r="1"/><circle cx="14.4" cy="12.5" r="1"/><path d="M11 15.6h2l-1 1.1z"/><path d="M3.5 14.5h2.6M17.9 14.5h2.6"/></symbol>' +
'<symbol id="i-racao" viewBox="0 0 24 24"><path d="M7.5 8.5V6.8a1.8 1.8 0 0 1 1.8-1.8h5.4a1.8 1.8 0 0 1 1.8 1.8v1.7"/><path d="M6.2 8.5h11.6L19 20H5z"/><path d="M9.5 13h5"/><circle cx="12" cy="16.6" r="1.1"/></symbol>' +
'<symbol id="i-osso" viewBox="0 0 24 24"><g transform="rotate(-45 12 12)"><rect x="7" y="10.5" width="10" height="3" rx="1.5"/><circle cx="6.2" cy="10.5" r="2"/><circle cx="6.2" cy="13.5" r="2"/><circle cx="17.8" cy="10.5" r="2"/><circle cx="17.8" cy="13.5" r="2"/></g></symbol>' +
'<symbol id="i-bolinha" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.5"/><path d="M5.6 9.2c2.1 1.6 2.1 3.9 0 5.5"/><path d="M18.4 9.2c-2.1 1.6-2.1 3.9 0 5.5"/></symbol>' +
'<symbol id="i-corda" viewBox="0 0 24 24"><path d="M5 16.5c1.8-3.6 3.6.6 5.4-3s3.6.6 5.4-3c.9-1.8 1.8-1.6 2.7-2"/><circle cx="4.6" cy="18" r="1.9"/><circle cx="19.6" cy="8" r="1.9"/></symbol>' +
'<symbol id="i-frisbee" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="8.5" ry="4.6"/><ellipse cx="12" cy="12" rx="4" ry="1.9"/></symbol>' +
'<symbol id="i-coleira" viewBox="0 0 24 24"><path d="M4.5 9.5a7.5 7.5 0 0 1 15 0"/><rect x="9" y="8.6" width="6" height="4" rx="1"/><path d="M12 12.6v1"/><circle cx="12" cy="16.4" r="2.6"/></symbol>' +
'<symbol id="i-guia" viewBox="0 0 24 24"><circle cx="7" cy="7" r="3"/><path d="M9.2 9.2L15.5 15.5"/><path d="M15.5 15.5l3 .6-.6 3z"/><circle cx="18.8" cy="18.8" r="1"/></symbol>' +
'<symbol id="i-caminha" viewBox="0 0 24 24"><path d="M4 13.5a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M4 13.5c1.6 1.6 4.2 2.2 8 2.2s6.4-.6 8-2.2"/></symbol>' +
'<symbol id="i-comedouro" viewBox="0 0 24 24"><path d="M3.5 12.5h17"/><path d="M5 12.5a7 7 0 0 0 14 0"/><circle cx="9.3" cy="9.6" r="1"/><circle cx="13.2" cy="8.7" r="1"/><circle cx="15.6" cy="10.2" r=".8"/></symbol>' +
'<symbol id="i-shampoo" viewBox="0 0 24 24"><rect x="8" y="8.5" width="8" height="11.5" rx="2"/><path d="M12 8.5V5.5M12 5.5H9"/><path d="M12 13.2s-1.7 2-1.7 3.1a1.7 1.7 0 0 0 3.4 0c0-1.1-1.7-3.1-1.7-3.1z"/></symbol>' +
'<symbol id="i-tapete" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="11" rx="2"/><rect x="6.6" y="9.6" width="10.8" height="5.8" rx="1"/></symbol>' +
'<symbol id="i-roupa" viewBox="0 0 24 24"><path d="M9 4L4 7.2l2 3 2-1.1V20h8V9.1l2 1.1 2-3L15 4a3 3 0 0 1-6 0z"/></symbol>' +
'<symbol id="i-sache" viewBox="0 0 24 24"><path d="M7 6h10l1 14H6z"/><path d="M7 6c0-1.2 1-1.8 2.2-1.5C10.5 4.8 12 6 12 6s1.5-1.2 2.8-1.5C16 4.2 17 5 17 6"/><circle cx="12" cy="12.5" r="2.6"/></symbol>' +
'<symbol id="i-areia" viewBox="0 0 24 24"><path d="M3.5 13.5h17l-1.3 6H4.8z"/><path d="M7.5 13.5c0-3.2 2-5.5 4.5-5.5s4.5 2.3 4.5 5.5"/></symbol>' +
'<symbol id="i-arranhador" viewBox="0 0 24 24"><path d="M8 20h8"/><path d="M12 20V8"/><path d="M8 8h8"/><path d="M7 5h10"/><path d="M9.7 12.5l4.6-1M9.7 15.5l4.6-1"/></symbol>' +
'<symbol id="i-varinha" viewBox="0 0 24 24"><path d="M4 20L13.5 10.5"/><path d="M15.5 8.6l.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z"/></symbol>' +
'<symbol id="i-ratinho" viewBox="0 0 24 24"><ellipse cx="10" cy="14.2" rx="5" ry="4"/><circle cx="6.3" cy="9.6" r="2"/><circle cx="12" cy="9" r="2"/><path d="M15 14.2c2 0 3.2-1.4 3.2-3.4"/><circle cx="8.4" cy="13.6" r=".8"/></symbol>' +
'<symbol id="i-fonte" viewBox="0 0 24 24"><path d="M6 20h12"/><path d="M8 20v-3h8v3"/><path d="M10.2 17v-2.6h3.6V17"/><path d="M12 14.4V10"/><path d="M12 7.4s-1.8 2-1.8 3.1a1.8 1.8 0 0 0 3.6 0C13.8 9.4 12 7.4 12 7.4z"/></symbol>' +
'<symbol id="i-iglu" viewBox="0 0 24 24"><path d="M4 18.5a8 8 0 0 1 16 0z"/><path d="M9.5 18.5a2.5 2.5 0 0 1 5 0"/></symbol>' +
'<symbol id="i-escova" viewBox="0 0 24 24"><rect x="8.5" y="3.5" width="7" height="6" rx="1.5"/><path d="M12 9.5V20"/><path d="M8.5 6.5h7"/></symbol>' +
'<symbol id="i-laser" viewBox="0 0 24 24"><rect x="10" y="3" width="4" height="8" rx="2"/><path d="M12 11v3"/><path d="M7 20l2-3M12 20v-3M17 20l-2-3"/></symbol>' +
'<symbol id="i-pote" viewBox="0 0 24 24"><rect x="7" y="8.5" width="10" height="11" rx="2"/><path d="M7.5 8.5v-2a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 16.5 6.5v2"/><path d="M9.5 13h5"/></symbol>' +
'<symbol id="i-alpiste" viewBox="0 0 24 24"><path d="M12 21V8"/><path d="M12 8C10 8 9 6.5 9 5c2 0 3 1.5 3 3zm0 0c2 0 3-1.5 3-3-2 0-3 1.5-3 3zm0 4c-2 0-3-1.5-3-3 2 0 3 1.5 3 3zm0 0c2 0 3-1.5 3-3-2 0-3 1.5-3 3zm0 4c-2 0-3-1.5-3-3 2 0 3 1.5 3 3zm0 0c2 0 3-1.5 3-3-2 0-3 1.5-3 3z"/></symbol>' +
'<symbol id="i-gaiola" viewBox="0 0 24 24"><path d="M5 20v-9a7 7 0 0 1 14 0v9"/><path d="M5 20h14"/><path d="M12 4v1.6M8.6 5.2l.9 1.4M15.4 5.2l-.9 1.4"/><path d="M8.5 20v-6.5M12 20v-7M15.5 20v-6.5"/><path d="M5 15h14"/></symbol>' +
'<symbol id="i-bebedouro" viewBox="0 0 24 24"><rect x="9" y="3.5" width="6" height="10" rx="2"/><path d="M9.5 7.5h5"/><path d="M12 13.5V18"/><circle cx="12" cy="19.6" r="1.2"/></symbol>' +
'<symbol id="i-escada" viewBox="0 0 24 24"><path d="M8 4v16M16 4v16"/><path d="M8 8.5h8M8 12.5h8M8 16.5h8"/></symbol>' +
'<symbol id="i-banheira" viewBox="0 0 24 24"><path d="M4 13.5h16l-1.3 5H5.3z"/><path d="M6.5 13.5a2 2 0 0 1 4 0 2 2 0 0 1 4 0 2 2 0 0 1 4 0"/><path d="M8 18.5L7 20M16 18.5l1 1.5"/></symbol>' +
'<symbol id="i-gota" viewBox="0 0 24 24"><path d="M10 3.5h4V7l2.4 6.2a4.9 4.9 0 0 1-8.8 0L10 7z"/><path d="M10 5.8h4"/></symbol>' +
'<symbol id="i-aquario" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="12" rx="2"/><ellipse cx="10" cy="13.5" rx="2.5" ry="1.7"/><path d="M12.5 13.5L14.5 12v3z"/><circle cx="16.6" cy="10.8" r=".8"/><circle cx="17.6" cy="13.8" r=".8"/></symbol>' +
'<symbol id="i-filtro" viewBox="0 0 24 24"><rect x="6" y="9" width="7" height="10" rx="1.5"/><path d="M13 12.5h4.5a2 2 0 0 0 2-2V7"/><path d="M8.5 12.5h2M8.5 15.5h2"/></symbol>' +
'<symbol id="i-castelo" viewBox="0 0 24 24"><path d="M6 20v-9h1.5V8h3v3H14V8h3v3H18.5v9"/><path d="M4 20h16"/><path d="M11 20v-2.8h2V20"/><path d="M16 8V4.5H20V7h-4"/></symbol>' +
'<symbol id="i-termometro" viewBox="0 0 24 24"><path d="M10 5a2 2 0 0 1 4 0v8.6a3.6 3.6 0 1 1-4 0z"/><circle cx="12" cy="17.3" r="1.5"/></symbol>' +
'<symbol id="i-lampada" viewBox="0 0 24 24"><rect x="4" y="8.5" width="16" height="5" rx="2.5"/><path d="M7.5 16.5L6.5 20M12 16.5V20M16.5 16.5l1 3.5"/></symbol>' +
'<symbol id="i-rede" viewBox="0 0 24 24"><circle cx="9" cy="9" r="5.2"/><path d="M5.8 6.5l6.5 6.5M12.3 6.5L5.8 13"/><path d="M12.7 12.7L19.5 19.5"/></symbol>' +
'<symbol id="i-roda" viewBox="0 0 24 24"><circle cx="12" cy="10.5" r="6.8"/><circle cx="12" cy="10.5" r="1.4"/><path d="M12 3.7v2.4M12 15.9v2.4M5.2 10.5h2.4M16.4 10.5h2.4"/><path d="M8.2 21l1.4-2.4M15.8 21l-1.4-2.4"/></symbol>' +
'<symbol id="i-substrato" viewBox="0 0 24 24"><path d="M4 18.5c2-4.2 4.8-6.2 8-6.2s6 2 8 6.2z"/><path d="M9.5 12.5L8.5 10M12 12.3V9.5M14.5 12.5l1-2.5"/></symbol>' +
'<symbol id="i-tunel" viewBox="0 0 24 24"><ellipse cx="7" cy="12" rx="3" ry="6"/><path d="M7 6h9.5a3.5 3.5 0 0 1 0 12H7"/></symbol>' +
'<symbol id="i-casinha" viewBox="0 0 24 24"><rect x="6" y="10.5" width="12" height="8.5" rx="1"/><path d="M4 10.5l8-5.5 8 5.5"/><circle cx="12" cy="14.8" r="2"/></symbol>' +
'<symbol id="i-bolaex" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.6"/><circle cx="12" cy="12" r="3"/><path d="M12 4.4V6.5M12 17.5v2.1M4.4 12h2.1M17.5 12h2.1"/></symbol>' +
'<symbol id="i-feno" viewBox="0 0 24 24"><path d="M6.5 20c0-5 .8-8.5 2.8-11-.8 4-.8 7.5.2 11"/><path d="M12 20V8.5"/><path d="M17.5 20c0-5-.8-8.5-2.8-11 .8 4 .8 7.5-.2 11"/><path d="M5 20h14"/></symbol>' +
'<symbol id="i-transporte" viewBox="0 0 24 24"><rect x="4" y="9" width="16" height="10" rx="2"/><path d="M9 9a3 3 0 0 1 6 0"/><path d="M13.5 9v10M13.5 13.5H20M16.7 9v10"/></symbol>' +
'<symbol id="i-cortador" viewBox="0 0 24 24"><circle cx="7.5" cy="17.3" r="2.3"/><circle cx="16.5" cy="17.3" r="2.3"/><path d="M9.2 15.4L6.8 7M14.8 15.4l2.4-8.4"/><path d="M6.8 7h3M14.2 7h3"/></symbol>' +
'<symbol id="i-lencos" viewBox="0 0 24 24"><rect x="4" y="11.5" width="16" height="8" rx="2"/><ellipse cx="12" cy="11.5" rx="3" ry="1.2"/><path d="M10.5 10.8V8.2L14.5 6v4.8"/></symbol>' +
'<symbol id="i-pipeta" viewBox="0 0 24 24"><path d="M9 3.5h6V8l-1 1.2V18a2 2 0 0 1-4 0V9.2L9 8z"/><path d="M12 9.2V18"/><path d="M9 5.8h6"/></symbol>' +
'<symbol id="i-vitamina" viewBox="0 0 24 24"><rect x="7" y="7.5" width="10" height="12.5" rx="2"/><path d="M9.5 7.5v-2h5v2"/><rect x="9.7" y="11.3" width="6.4" height="2.7" rx="1.35" transform="rotate(-28 13 12.6)"/></symbol>' +
'<symbol id="i-pelucia" viewBox="0 0 24 24"><circle cx="7.8" cy="7.8" r="2.3"/><circle cx="16.2" cy="7.8" r="2.3"/><circle cx="12" cy="10.3" r="4"/><ellipse cx="12" cy="17" rx="4.6" ry="3.6"/><circle cx="10.4" cy="9.8" r=".8"/><circle cx="13.6" cy="9.8" r=".8"/></symbol>' +
'<symbol id="i-bandana" viewBox="0 0 24 24"><path d="M4 8.5h16l-8 11z"/><path d="M4 8.5c2-2.2 5-3.2 8-3.2s6 1 8 3.2"/></symbol>' +
'<symbol id="i-tapetegel" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="10" rx="2"/><path d="M12 10.5v5M9.7 11.8l4.6 2.5M14.3 11.8l-4.6 2.5"/></symbol>' +
'<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M15.8 15.8L20.5 20.5"/></symbol>' +
'<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7.3-4.5-7.3-9.8A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.3 2.6C19.3 15.5 12 20 12 20z"/></symbol>' +
'<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/></symbol>' +
'<symbol id="i-cart" viewBox="0 0 24 24"><circle cx="9.5" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/><path d="M2.8 4h2.6l2.3 11h10.5l2.3-8H6.8"/></symbol>' +
'<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
'<symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>' +
'<symbol id="i-chev-down" viewBox="0 0 24 24"><path d="M6 9.5l6 6 6-6"/></symbol>' +
'<symbol id="i-chev-left" viewBox="0 0 24 24"><path d="M14.5 6l-6 6 6 6"/></symbol>' +
'<symbol id="i-chev-right" viewBox="0 0 24 24"><path d="M9.5 6l6 6-6 6"/></symbol>' +
'<symbol id="i-chev-up" viewBox="0 0 24 24"><path d="M6 14.5l6-6 6 6"/></symbol>' +
'<symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M4 12h15M13 6.5L18.5 12 13 17.5"/></symbol>' +
'<symbol id="i-star" viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/></symbol>' +
'<symbol id="i-trash" viewBox="0 0 24 24"><path d="M4 7h16M9.5 7V5h5v2M6.5 7l1 13h9l1-13"/><path d="M10 11v6M14 11v6"/></symbol>' +
'<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>' +
'<symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14"/></symbol>' +
'<symbol id="i-check" viewBox="0 0 24 24"><path d="M4.5 12.5l5 5L19.5 7"/></symbol>' +
'<symbol id="i-check-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.3l2.5 2.5 4.7-5"/></symbol>' +
'<symbol id="i-truck" viewBox="0 0 24 24"><path d="M2.5 6.5h11V16h-11z"/><path d="M13.5 10.5h3.8l3.2 3.5V16h-7"/><circle cx="6.5" cy="17.8" r="1.8"/><circle cx="17" cy="17.8" r="1.8"/></symbol>' +
'<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l7.5 3v6c0 4.5-3 7.2-7.5 9-4.5-1.8-7.5-4.5-7.5-9V6z"/><path d="M9 11.8l2.2 2.2 4-4.2"/></symbol>' +
'<symbol id="i-refresh" viewBox="0 0 24 24"><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 3.5V8H15"/></symbol>' +
'<symbol id="i-headset" viewBox="0 0 24 24"><path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"/><rect x="3" y="13" width="4.5" height="6.5" rx="1.6"/><rect x="16.5" y="13" width="4.5" height="6.5" rx="1.6"/><path d="M19 19.5a4 4 0 0 1-4 2h-2.5"/></symbol>' +
'<symbol id="i-sliders" viewBox="0 0 24 24"><path d="M4.5 7h15M4.5 12h15M4.5 17h15"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="14" cy="17" r="2"/></symbol>' +
'<symbol id="i-eye" viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></symbol>' +
'<symbol id="i-eye-off" viewBox="0 0 24 24"><path d="M4 4l16 16"/><path d="M9.9 5.9A9.5 9.5 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.2 3.7M6.2 6.8A16 16 0 0 1 2.5 12S6 18.5 12 18.5c1.1 0 2.2-.2 3.1-.6"/></symbol>' +
'<symbol id="i-logout" viewBox="0 0 24 24"><path d="M13.5 4.5h-8v15h8"/><path d="M10 12h11M17 8.5L20.5 12 17 15.5"/></symbol>' +
'<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6.5-5.6-6.5-10.5A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.5C18.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.2"/></symbol>' +
'<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.8 3.5h2.7l1.6 4.8-2 1.6a12 12 0 0 0 4.9 4.9l1.6-2 4.8 1.6v2.7a1.6 1.6 0 0 1-1.6 1.6C10.6 18.7 5.2 13.3 5.2 5.1a1.6 1.6 0 0 1 1.6-1.6z"/></symbol>' +
'<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7.2L12 13l8.5-5.8"/></symbol>' +
'<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></symbol>' +
'<symbol id="i-box" viewBox="0 0 24 24"><path d="M3.5 8L12 3.5 20.5 8v8L12 20.5 3.5 16z"/><path d="M3.5 8L12 12.5 20.5 8"/><path d="M12 12.5V20"/></symbol>' +
'<symbol id="i-card" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M6.5 15h4"/></symbol>' +
'<symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></symbol>' +
'<symbol id="i-gift" viewBox="0 0 24 24"><rect x="4" y="9" width="16" height="4" rx="1"/><path d="M6 13v7h12v-7"/><path d="M12 9v11"/><path d="M12 9S8.5 9 7.3 7.6 8.6 4.7 10 6s2 3 2 3zm0 0s3.5 0 4.7-1.4S15.4 4.7 14 6s-2 3-2 3z"/></symbol>' +
'<symbol id="i-tag" viewBox="0 0 24 24"><path d="M3.5 12V4.5a1 1 0 0 1 1-1H12l8.5 8.5a1.4 1.4 0 0 1 0 2L14 20.5a1.4 1.4 0 0 1-2 0z"/><circle cx="8.5" cy="8.5" r="1.4"/></symbol>' +
'<symbol id="i-copy" viewBox="0 0 24 24"><rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M5.5 15h-1A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5v1"/></symbol>' +
'<symbol id="i-alert" viewBox="0 0 24 24"><path d="M12 3.5L22 20H2z"/><path d="M12 9.5V14"/><circle cx="12" cy="16.8" r=".9"/></symbol>' +
'<symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".9"/></symbol>' +
'<symbol id="i-send" viewBox="0 0 24 24"><path d="M21 3.5L10 14.5"/><path d="M21 3.5L14 21l-4-6.5L3.5 10z"/></symbol>' +
'<symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 4l1.7 5.3L19 11l-5.3 1.7L12 18l-1.7-5.3L5 11l5.3-1.7z"/></symbol>' +
'<symbol id="i-pix" viewBox="0 0 24 24"><rect x="7.2" y="7.2" width="9.6" height="9.6" rx="2" transform="rotate(45 12 12)"/><circle cx="12" cy="12" r="2.4"/></symbol>' +
'<symbol id="i-store" viewBox="0 0 24 24"><path d="M4 9.5L5 4.5h14l1 5"/><path d="M4 9.5h16V20H4z"/><path d="M9.5 20v-5h5v5"/></symbol>' +
'<symbol id="i-grid" viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></symbol>' +
'<symbol id="i-edit" viewBox="0 0 24 24"><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/></symbol>' +
'<symbol id="i-share" viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5"/><circle cx="17.5" cy="5.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/><path d="M8.2 10.8l7.1-4M8.2 13.2l7.1 4"/></symbol>' +
'<symbol id="i-facebook" viewBox="0 0 24 24"><path d="M14 8.5V7a1 1 0 0 1 1-1h1.5V2.5H14a4 4 0 0 0-4 4v2H7.5V12H10v9.5h4V12h2.7l.5-3.5z"/></symbol>' +
'<symbol id="i-instagram" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r="1.1"/></symbol>' +
'<symbol id="i-youtube" viewBox="0 0 24 24"><rect x="2.5" y="6" width="19" height="12.5" rx="3.5"/><path d="M10.5 9.8l4.5 2.7-4.5 2.7z" fill="currentColor" stroke="none"/></symbol>' +
'</defs></svg>';

/* ------------------------------ Templates ------------------------------ */
function topbarHTML(b){
  return '' +
  '<div class="topbar"><div class="container topbar-inner">' +
    '<div class="tb-left">' +
      '<span class="tb-item">' + PS.icon('clock') + ' Seg a sábado &bull; 8h às 22h</span>' +
      '<a class="tb-item tb-link" href="tel:+5531988887777">' + PS.icon('phone') + ' (31) 98888-7777</a>' +
    '</div>' +
    '<div class="tb-right">' +
      '<a class="tb-link" href="' + b + 'pages/ajuda.html#faq">Ajuda</a>' +
      '<a class="tb-link" href="' + b + 'pages/ajuda.html#entregas">Entregas</a>' +
      '<span class="tb-sep" aria-hidden="true"></span>' +
      '<span id="tb-user"><a class="tb-link tb-strong" href="' + b + 'pages/login.html">Entre</a> <span class="tb-dim">ou</span> <a class="tb-link tb-strong" href="' + b + 'pages/cadastro.html">cadastre-se</a></span>' +
    '</div>' +
  '</div></div>';
}

function headerHTML(b){
  return '' +
  '<header class="header" id="siteHeader"><div class="container header-inner">' +
    '<button class="icon-btn hamburger" id="btnMenu" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobileMenu">' + PS.icon('menu') + '</button>' +
    '<nav class="nav" aria-label="Navegação principal">' +
      '<a class="nav-link" data-nav="cachorros" href="' + b + 'cachorros.html">Cachorros</a>' +
      '<a class="nav-link" data-nav="gatos" href="' + b + 'gatos.html">Gatos</a>' +
      '<a class="nav-link" data-nav="passaros" href="' + b + 'passaros.html">Pássaros</a>' +
      '<a class="nav-link" data-nav="peixes" href="' + b + 'peixes.html">Peixes</a>' +
      '<a class="nav-link" data-nav="hamsters" href="' + b + 'hamsters.html">Hamsters</a>' +
      '<div class="has-drop">' +
        '<button class="nav-link drop-btn" data-nav="categorias" aria-haspopup="true" aria-expanded="false">Categorias ' + PS.icon('chev-down') + '</button>' +
        '<div class="drop" role="menu">' +
          '<a data-nav="alimentacao" href="' + b + 'alimentacao.html">' + PS.icon('racao') + ' Alimentação</a>' +
          '<a data-nav="brinquedos" href="' + b + 'brinquedos.html">' + PS.icon('bolinha') + ' Brinquedos</a>' +
          '<a data-nav="higiene" href="' + b + 'higiene.html">' + PS.icon('shampoo') + ' Higiene</a>' +
          '<a data-nav="acessorios" href="' + b + 'acessorios.html">' + PS.icon('coleira') + ' Acessórios</a>' +
        '</div>' +
      '</div>' +
      '<a class="nav-link nav-offer" data-nav="ofertas" href="' + b + 'pages/busca.html?ofertas=1">' + PS.icon('tag') + ' Ofertas</a>' +
    '</nav>' +
    '<a class="logo" href="' + b + 'index.html" aria-label="Patas e Pelos Pet Shop — página inicial">' +
      '<span class="logo-mark">' + PS.icon('paw', 'fill') + '</span>' +
      '<span class="logo-text">Patas &amp; Pelos<small>Pet shop</small></span>' +
    '</a>' +
    '<div class="h-actions">' +
      '<button class="icon-btn" id="btnSearch" aria-label="Buscar produtos">' + PS.icon('search') + '</button>' +
      '<a class="icon-btn h-fav" href="' + b + 'pages/favoritos.html" aria-label="Meus favoritos">' + PS.icon('heart') + '<span class="count-badge" id="favCount" hidden>0</span></a>' +
      '<a class="icon-btn h-user" id="btnUser" href="' + b + 'pages/login.html" aria-label="Minha conta">' + PS.icon('user') + '</a>' +
      '<button class="icon-btn" id="btnCart" aria-label="Abrir carrinho">' + PS.icon('cart') + '<span class="count-badge" id="cartCount" hidden>0</span></button>' +
    '</div>' +
  '</div></header>';
}

function mobileMenuHTML(b){
  var links = [
    ['index.html', 'Início', 'store'],
    ['cachorros.html', 'Cachorros', 'dog'],
    ['gatos.html', 'Gatos', 'cat'],
    ['passaros.html', 'Pássaros', 'bird'],
    ['peixes.html', 'Peixes', 'fish'],
    ['hamsters.html', 'Hamsters e pequenos', 'hamster'],
    ['alimentacao.html', 'Alimentação', 'racao'],
    ['brinquedos.html', 'Brinquedos', 'bolinha'],
    ['higiene.html', 'Higiene', 'shampoo'],
    ['acessorios.html', 'Acessórios', 'coleira'],
    ['pages/busca.html?ofertas=1', 'Ofertas', 'tag'],
    ['pages/favoritos.html', 'Meus favoritos', 'heart'],
    ['pages/ajuda.html', 'Ajuda', 'info']
  ];
  var nav = links.map(function(l){
    return '<a class="mm-link" href="' + b + l[0] + '">' + PS.icon(l[2]) + ' ' + l[1] + '</a>';
  }).join('');
  return '' +
  '<aside class="mobile-menu" id="mobileMenu" aria-label="Menu do site">' +
    '<div class="mm-head">' +
      '<span class="logo-mini"><span class="logo-mark sm">' + PS.icon('paw', 'fill') + '</span> Patas &amp; Pelos</span>' +
      '<button class="icon-btn" id="btnCloseMenu" aria-label="Fechar menu">' + PS.icon('x') + '</button>' +
    '</div>' +
    '<form class="mm-search" action="' + b + 'pages/busca.html" method="get" role="search">' +
      '<label class="sr-only" for="mm-q">Buscar produtos</label>' +
      '<input class="input" type="search" id="mm-q" name="q" placeholder="Buscar produtos..." autocomplete="off">' +
      '<button class="btn btn-primary" type="submit" aria-label="Buscar">' + PS.icon('search') + '</button>' +
    '</form>' +
    '<nav class="mm-nav">' + nav + '</nav>' +
    '<div class="mm-foot" id="mm-foot">' +
      '<a class="btn btn-dark btn-block" href="' + b + 'pages/login.html">' + PS.icon('user') + ' Entrar na minha conta</a>' +
    '</div>' +
  '</aside>';
}

function footerHTML(b){
  return '' +
  '<footer class="footer"><div class="container">' +
    '<div class="foot-grid">' +
      '<div class="foot-brand">' +
        '<a class="logo logo-light" href="' + b + 'index.html" aria-label="Patas e Pelos Pet Shop — página inicial">' +
          '<span class="logo-mark">' + PS.icon('paw', 'fill') + '</span>' +
          '<span class="logo-text">Patas &amp; Pelos<small>Pet shop</small></span>' +
        '</a>' +
        '<p>Tudo para o seu melhor amigo: rações, brinquedos, higiene e acessórios para cães, gatos, pássaros, peixes e pequenos animais.</p>' +
        '<div class="social">' +
          '<a href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook">' + PS.icon('facebook', 'fill') + '</a>' +
          '<a href="https://www.instagram.com" target="_blank" rel="noopener" aria-label="Instagram">' + PS.icon('instagram') + '</a>' +
          '<a href="https://www.youtube.com" target="_blank" rel="noopener" aria-label="YouTube">' + PS.icon('youtube') + '</a>' +
        '</div>' +
        '<div class="pay-badges" aria-label="Formas de pagamento aceitas">' +
          '<span>Visa</span><span>Master</span><span>Elo</span><span>Pix</span><span>Boleto</span>' +
        '</div>' +
      '</div>' +
      '<nav class="foot-col" aria-label="Sobre a loja"><h3>Pet Shop</h3><ul>' +
        '<li><button type="button" class="link-btn" data-open-sobre>Sobre nós</button></li>' +
        '<li><button type="button" class="link-btn" data-open-contato>Contato</button></li>' +
        '<li><a href="' + b + 'pages/ajuda.html#loja">Nossa loja</a></li>' +
        '<li><a href="' + b + 'pages/ajuda.html#faq">Perguntas frequentes</a></li>' +
      '</ul></nav>' +
      '<nav class="foot-col" aria-label="Atendimento"><h3>Atendimento</h3><ul>' +
        '<li><a href="' + b + 'pages/ajuda.html#trocas">Trocas e devoluções</a></li>' +
        '<li><a href="' + b + 'pages/ajuda.html#entregas">Entregas</a></li>' +
        '<li><button type="button" class="link-btn" data-open-contato>Fale conosco</button></li>' +
        '<li><a href="' + b + 'pages/ajuda.html#faq">Central de ajuda</a></li>' +
      '</ul></nav>' +
      '<nav class="foot-col" aria-label="Categorias"><h3>Categorias</h3><ul>' +
        '<li><a href="' + b + 'cachorros.html">Cachorros</a></li>' +
        '<li><a href="' + b + 'gatos.html">Gatos</a></li>' +
        '<li><a href="' + b + 'passaros.html">Pássaros</a></li>' +
        '<li><a href="' + b + 'peixes.html">Peixes</a></li>' +
        '<li><a href="' + b + 'hamsters.html">Pequenos animais</a></li>' +
      '</ul></nav>' +
      '<div class="foot-col foot-news"><h3>Ofertas no seu e-mail</h3>' +
        '<p>Cadastre-se e ganhe <strong>10% OFF</strong> na primeira compra.</p>' +
        '<form class="news-form" novalidate>' +
          '<label class="sr-only" for="news-email">Seu e-mail</label>' +
          '<input class="input" type="email" id="news-email" name="email" placeholder="Seu melhor e-mail" autocomplete="email">' +
          '<button class="btn btn-primary" type="submit">Assinar</button>' +
        '</form>' +
        '<small>Ao assinar, você concorda com a nossa <button type="button" class="link-btn sm" data-open-privacidade>Política de Privacidade</button>.</small>' +
      '</div>' +
    '</div>' +
    '<div class="foot-bottom"><div class="foot-bottom-inner">' +
      '<span>© <span id="year">2026</span> Patas &amp; Pelos Pet Shop. Todos os direitos reservados.</span>' +
      '<span class="foot-legal"><button type="button" class="link-btn sm" data-open-privacidade>Privacidade</button><span aria-hidden="true">•</span><button type="button" class="link-btn sm" data-open-termos>Termos de uso</button></span>' +
    '</div></div>' +
  '</div></footer>';
}

function overlaysHTML(){
  return '' +
  '<div class="scrim" id="scrim"></div>' +
  '<aside class="drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-labelledby="drawerTitle" aria-hidden="true">' +
    '<div class="drawer-head"><h2 id="drawerTitle">Seu carrinho</h2>' +
      '<button class="icon-btn" data-close-drawer aria-label="Fechar carrinho">' + PS.icon('x') + '</button></div>' +
    '<div class="drawer-body" id="drawerBody"></div>' +
    '<div class="drawer-foot" id="drawerFoot"></div>' +
  '</aside>' +
  '<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" hidden>' +
    '<div class="modal-card" id="modalCard" role="document">' +
      '<div class="modal-head"><h2 id="modalTitle"></h2>' +
        '<button class="icon-btn" data-close-modal aria-label="Fechar janela">' + PS.icon('x') + '</button></div>' +
      '<div class="modal-body" id="modalBody"></div>' +
    '</div>' +
  '</div>' +
  '<div class="toasts" id="toasts" aria-live="polite" aria-atomic="false"></div>' +
  '<button class="back-top" id="backTop" aria-label="Voltar ao topo">' + PS.icon('chev-up') + '</button>';
}

/* ------------------------------- Toasts -------------------------------- */
PS.toast = function(msg, type){
  var box = document.getElementById('toasts');
  if(!box) return;
  type = type || 'success';
  var icons = { success: 'check-circle', error: 'alert', info: 'info' };
  var el = document.createElement('div');
  el.className = 'toast toast-' + type;
  el.innerHTML = PS.icon(icons[type] || 'info') + '<span>' + msg + '</span>';
  box.appendChild(el);
  requestAnimationFrame(function(){ el.classList.add('show'); });
  setTimeout(function(){
    el.classList.remove('show');
    setTimeout(function(){ el.remove(); }, 350);
  }, 3400);
};

/* ------------------------------- Modal --------------------------------- */
var lastFocus = null;
PS.modal = {
  open: function(opts){
    opts = opts || {};
    var m = document.getElementById('modal');
    if(!m) return;
    lastFocus = document.activeElement;
    document.getElementById('modalTitle').textContent = opts.title || '';
    var body = document.getElementById('modalBody');
    body.innerHTML = opts.body || '';
    document.getElementById('modalCard').classList.toggle('wide', !!opts.wide);
    m.hidden = false;
    requestAnimationFrame(function(){ m.classList.add('show'); });
    document.body.classList.add('locked');
    var f = body.querySelector('input, select, textarea, button:not([data-close-modal])');
    setTimeout(function(){ (f || m.querySelector('[data-close-modal]')).focus(); }, 60);
    if(typeof opts.onOpen === 'function') opts.onOpen(body);
  },
  close: function(){
    var m = document.getElementById('modal');
    if(!m || m.hidden) return;
    m.classList.remove('show');
    if(m.dataset.locked){ delete m.dataset.locked; PS.unlock(); }
    setTimeout(function(){ m.hidden = true; }, 250);
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }
};

/* --------------------------- Scroll lock ------------------------------- */
var locks = 0;
PS.lock = function(){ locks++; document.body.classList.add('locked'); };
PS.unlock = function(){ locks = Math.max(0, locks - 1); if(!locks) document.body.classList.remove('locked'); };

/* ------------------------------- Layout -------------------------------- */
PS.layout = {
  base: '',
  init: function(){
    var body = document.body;
    var b = body.dataset.base || '';
    PS.layout.base = b;

    body.insertAdjacentHTML('afterbegin',
      SPRITE +
      '<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>' +
      topbarHTML(b) + headerHTML(b) + mobileMenuHTML(b));
    body.insertAdjacentHTML('beforeend', footerHTML(b) + overlaysHTML());

    var year = document.getElementById('year');
    if(year) year.textContent = new Date().getFullYear();

    /* Link ativo */
    var nav = body.dataset.nav;
    if(nav){
      document.querySelectorAll('[data-nav="' + nav + '"]').forEach(function(a){ a.classList.add('active'); });
      if(['alimentacao', 'brinquedos', 'higiene', 'acessorios'].indexOf(nav) > -1){
        var db = document.querySelector('.drop-btn');
        if(db) db.classList.add('active');
      }
    }

    /* Header com sombra no scroll + botão topo */
    var header = document.getElementById('siteHeader');
    var backTop = document.getElementById('backTop');
    var onScroll = function(){
      var y = window.scrollY || 0;
      header.classList.toggle('scrolled', y > 8);
      backTop.classList.toggle('show', y > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    backTop.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); });

    /* Menu mobile */
    var menu = document.getElementById('mobileMenu');
    var scrim = document.getElementById('scrim');
    var btnMenu = document.getElementById('btnMenu');
    var openMenu = function(){
      menu.classList.add('open'); scrim.classList.add('show');
      btnMenu.setAttribute('aria-expanded', 'true');
      PS.lock();
    };
    var closeMenu = function(){
      if(!menu.classList.contains('open')) return;
      menu.classList.remove('open'); scrim.classList.remove('show');
      btnMenu.setAttribute('aria-expanded', 'false');
      PS.unlock();
    };
    PS.layout.closeMenu = closeMenu;
    btnMenu.addEventListener('click', openMenu);
    document.getElementById('btnCloseMenu').addEventListener('click', closeMenu);

    /* Drawer */
    var closeDrawer = function(){
      var d = document.getElementById('cartDrawer');
      if(!d.classList.contains('open')) return;
      d.classList.remove('open');
      d.setAttribute('aria-hidden', 'true');
      scrim.classList.remove('show');
      PS.unlock();
    };
    PS.layout.closeDrawer = closeDrawer;
    document.getElementById('btnCart').addEventListener('click', function(){
      if(PS.cartUI) PS.cartUI.openDrawer();
    });

    /* Fechamentos globais */
    scrim.addEventListener('click', function(){ closeMenu(); closeDrawer(); });
    document.addEventListener('click', function(e){
      if(e.target.closest('[data-close-drawer]')) closeDrawer();
      if(e.target.closest('[data-close-modal]')) PS.modal.close();
    });
    document.getElementById('modal').addEventListener('click', function(e){
      if(e.target === this) PS.modal.close();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ PS.modal.close(); closeMenu(); closeDrawer(); }
    });

    /* Busca do header */
    document.getElementById('btnSearch').addEventListener('click', function(){
      var input = document.getElementById('buscaInput');
      if(input){
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function(){ input.focus({ preventScroll: true }); }, 450);
      } else {
        window.location.href = b + 'pages/busca.html';
      }
    });

    /* Dropdown acessível no mobile (toque) */
    var dropBtn = document.querySelector('.drop-btn');
    if(dropBtn){
      dropBtn.addEventListener('click', function(){
        var open = dropBtn.getAttribute('aria-expanded') === 'true';
        dropBtn.setAttribute('aria-expanded', String(!open));
        dropBtn.parentElement.classList.toggle('open', !open);
      });
      document.addEventListener('click', function(e){
        if(!e.target.closest('.has-drop')){
          dropBtn.setAttribute('aria-expanded', 'false');
          dropBtn.parentElement.classList.remove('open');
        }
      });
    }

    PS.layout.syncUser();
  },

  /* Atualiza áreas do usuário (topbar, header, menu) conforme login */
  syncUser: function(){
    var b = PS.layout.base || '';
    var user = (PS.auth && PS.auth.current()) || null;
    var tb = document.getElementById('tb-user');
    var btnUser = document.getElementById('btnUser');
    var mmFoot = document.getElementById('mm-foot');
    if(user){
      var first = PS.esc(user.nome.split(' ')[0]);
      if(tb) tb.innerHTML = '<span class="tb-hello">Olá, <a class="tb-link tb-strong" href="' + b + 'pages/perfil.html">' + first + '</a></span>';
      if(btnUser){ btnUser.href = b + 'pages/perfil.html'; btnUser.setAttribute('aria-label', 'Minha conta — ' + first); }
      if(mmFoot) mmFoot.innerHTML = '<a class="btn btn-dark btn-block" href="' + b + 'pages/perfil.html">' + PS.icon('user') + ' Olá, ' + first + '</a>';
    } else {
      if(tb) tb.innerHTML = '<a class="tb-link tb-strong" href="' + b + 'pages/login.html">Entre</a> <span class="tb-dim">ou</span> <a class="tb-link tb-strong" href="' + b + 'pages/cadastro.html">cadastre-se</a>';
      if(btnUser){ btnUser.href = b + 'pages/login.html'; btnUser.setAttribute('aria-label', 'Minha conta — entrar'); }
      if(mmFoot) mmFoot.innerHTML = '<a class="btn btn-dark btn-block" href="' + b + 'pages/login.html">' + PS.icon('user') + ' Entrar na minha conta</a>';
    }
  },

  setCount: function(id, n){
    var el = document.getElementById(id);
    if(!el) return;
    el.textContent = n > 99 ? '99+' : n;
    el.hidden = n <= 0;
  }
};
