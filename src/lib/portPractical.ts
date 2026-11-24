const wall = [
  ['Escuela Taller Cartagena de Indias (ETCAR) looks after the national fortifications. Its remit here is the historic fabric and the public wall walk.', 'The public wall walk is free. Use an open signed access and observe any barriers for maintenance or events.'],
  ['La Escuela Taller Cartagena de Indias (ETCAR) cuida las fortificaciones nacionales. Aquí su labor abarca el patrimonio construido y el paseo público.', 'El paseo público por la muralla es gratuito. Usa un acceso habilitado y respeta los cierres por mantenimiento o actividades.'],
  ['卡塔赫纳工艺学校（ETCAR）受托照护国家城防遗产，此处涉及古墙本体及公共参观步道。', '公共城墙步道免费。请使用开放的指定通道，遵守维修或活动期间的临时封闭。']
];
export const practical: Record<string, string[][]> = {
  wall,
  boat: [
    ['ETCAR oversees the fortifications of Bocachica, including San José. Boat services and permission to land must be arranged separately.', 'Confirm the landing, the return pier and whether access to the courtyard is available before booking. A boat excursion may only pass this fort.'],
    ['ETCAR administra las fortificaciones de Bocachica, entre ellas San José. El traslado en lancha y la autorización de desembarco se gestionan por separado.', 'Antes de reservar confirma el desembarco, el muelle de regreso y la apertura del patio. Algunas excursiones solo pasan frente al fuerte.'],
    ['ETCAR 管理包括圣何塞堡在内的博卡奇卡城防遗产。船只接送和岛上登陆许可需要另外落实。','订船前确认能否靠岛、是否开放内院及返程码头。有些游览船只经过堡前水面。']
  ],
  castle: [
    ['ETCAR manages visitor access and conservation at San Felipe de Barajas. Use the castle ticket office or the official visitor service.', 'The castle has its own admission. Check the official ticket desk for the day’s access and any changes to the upper route.'],
    ['ETCAR gestiona el acceso y la conservación del Castillo de San Felipe de Barajas. Utiliza la taquilla del castillo o el servicio oficial de visitantes.', 'El castillo tiene entrada propia. Consulta en taquilla el acceso del día y las condiciones del recorrido superior.'],
    ['ETCAR 负责圣费利佩城堡的参观管理与文物养护。请通过本堡售票处或官方游客服务购票。','城堡单独售票。当天的入场与上层路线开放情况，请在城堡售票处核实。']
  ],
  naval: [
    ['Fundación Museo Naval del Caribe operates the museum and works with the Colombian Navy on maritime heritage.', 'The museum lists daily opening from 09:00 to 17:30 and an adult admission of COP 24,000. Confirm the current rate at reception.'],
    ['La Fundación Museo Naval del Caribe opera el museo y coopera con la Armada Nacional en la conservación de la memoria marítima.', 'El museo anuncia apertura diaria de 09:00 a 17:30 y entrada general de COP 24.000. Confirma la tarifa vigente en recepción.'],
    ['加勒比海军博物馆基金会运营本馆，并与哥伦比亚海军合作保护航海遗产。','馆方公布每日09:00至17:30开放，成人票24,000哥伦比亚比索。到馆请向接待处核对现行票价。']
  ],
  history: [
    ['Museo Histórico de Cartagena de Indias (MUHCA) operates the exhibitions and visitor programme in the palace.', 'MUHCA lists Monday–Saturday 09:00–18:00 and Sundays and holidays 10:00–16:00. The published adult ticket is COP 24,000.'],
    ['El Museo Histórico de Cartagena de Indias (MUHCA) gestiona las exposiciones y la atención al público dentro del palacio.', 'El MUHCA anuncia lunes a sábado de 09:00 a 18:00 y domingos y festivos de 10:00 a 16:00. La entrada general publicada es de COP 24.000.'],
    ['卡塔赫纳历史博物馆（MUHCA）负责宫内展览与游客接待。','馆方公布周一至周六09:00至18:00，周日及假日10:00至16:00；成人票24,000哥伦比亚比索。']
  ],
  claver: [
    ['The Jesuit community of Cartagena oversees the sanctuary. The museum desk handles gallery admission, while the parish schedules worship.', 'The museum lists Monday–Friday 09:00–16:30 and weekends and holidays 10:00–16:00. Ask the desk which museum tariff applies to your visit.'],
    ['La comunidad jesuita de Cartagena está a cargo del santuario. El museo atiende el ingreso a salas y la parroquia organiza las celebraciones.', 'El museo publica horario de lunes a viernes de 09:00 a 16:30 y los fines de semana y festivos de 10:00 a 16:00. Consulta en taquilla la tarifa correspondiente.'],
    ['卡塔赫纳耶稣会团体管理圣所。博物馆接待处负责展室入场，堂区负责礼拜安排。','博物馆公布周一至周五09:00至16:30，周末及假日10:00至16:00。适用票种请向售票处查询。']
  ],
  zenu: [
    ['Banco de la República manages the museum through its cultural network in Cartagena.', 'The bank lists Tuesday–Saturday 09:00–17:00 and Sunday 09:00–14:00; the museum closes on Monday. Check the bank’s closure calendar for holidays.'],
    ['El Banco de la República administra el museo como parte de su red cultural en Cartagena.', 'El Banco anuncia martes a sábado de 09:00 a 17:00 y domingos de 09:00 a 14:00; cierra los lunes. Consulta el calendario de cierres para los festivos.'],
    ['哥伦比亚共和国银行通过卡塔赫纳文化网络管理本馆。','银行公布周二至周六09:00至17:00、周日09:00至14:00，周一闭馆。假日请另查银行的闭馆日历。']
  ],
  aviary: [
    ['Aviario Nacional de Colombia operates the visitor circuit and the bird-care facilities on Barú. The Oceanario has separate management and tickets.', 'Book or check admission with the aviary. Agree on transport to and from the road entrance separately from an island boat excursion.'],
    ['El Aviario Nacional de Colombia opera el circuito de visita y las instalaciones de cuidado de aves en Barú. El Oceanario cuenta con otra gestión y boletería.', 'Consulta la entrada directamente con el aviario. Acuerda el traslado de ida y regreso a la entrada por carretera aparte del paseo en lancha.'],
    ['哥伦比亚国家鸟园运营巴鲁园区的参观步道与鸟类照护设施。海洋馆另有管理单位和票务。','入园条件向鸟园查询。请单独约好巴鲁公路入口的接送，与群岛游船行程分别确认。']
  ]
};
