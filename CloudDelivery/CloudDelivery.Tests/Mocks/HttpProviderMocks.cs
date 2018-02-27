using CloudDelivery.Providers;
using Moq;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudDelivery.Extensions;
using Newtonsoft.Json;
using CloudDelivery.Models.GoogleApis;

namespace CloudDelivery.Tests.Mocks
{
    public class HttpProviderMocks
    {
        private static readonly string gmapsKey = System.Configuration.ConfigurationManager.AppSettings["GoogleMapsApiKey"];
        private static readonly string distanceMatrixUri = System.Configuration.ConfigurationManager.AppSettings["DistanceMatrixUri"];
        private static readonly string directionsUri = System.Configuration.ConfigurationManager.AppSettings["DirectionsUri"];
        private static readonly string geocodeUri = System.Configuration.ConfigurationManager.AppSettings["GeocodeUri"];


        public static Mock<IHttpProvider> GMapsHttpProviderMock()
        {
            var httpClientMock = new Mock<IHttpProvider>();

            //set methods mocks
            Geocoder(httpClientMock);
            DistanceMatrixOriginDest(httpClientMock);
            DistanceMatrixWithWaypoint(httpClientMock);
            DirectionsOriginDest(httpClientMock);
            DirectionsWithWaypoint(httpClientMock);

            return httpClientMock;
        }

        private static void Geocoder(Mock<IHttpProvider> mock)
        {
            Dictionary<string, string> parametersGeocoder = new Dictionary<string, string>();
            parametersGeocoder.Add("key", gmapsKey);
            parametersGeocoder.Add("address", "Blanes+Spain");
            string responseGeocoder = "{ 'results' : [ { 'address_components' : [ { 'long_name' : 'Blanes', 'short_name' : 'Blanes', 'types' : [ 'locality', 'political' ] }, { 'long_name' : 'Girona', 'short_name' : 'Girona', 'types' : [ 'administrative_area_level_2', 'political' ] }, { 'long_name' : 'Catalunya', 'short_name' : 'CT', 'types' : [ 'administrative_area_level_1', 'political' ] }, { 'long_name' : 'Hiszpania', 'short_name' : 'ES', 'types' : [ 'country', 'political' ] }, { 'long_name' : '17300', 'short_name' : '17300', 'types' : [ 'postal_code' ] } ], 'formatted_address' : '17300 Blanes, Girona, Hiszpania', 'geometry' : { 'bounds' : { 'northeast' : { 'lat' : 41.6877822, 'lng' : 2.8024599 }, 'southwest' : { 'lat' : 41.6511206, 'lng' : 2.7646659 } }, 'location' : { 'lat' : 41.6759954, 'lng' : 2.7902289 }, 'location_type' : 'APPROXIMATE', 'viewport' : { 'northeast' : { 'lat' : 41.6877822, 'lng' : 2.8024599 }, 'southwest' : { 'lat' : 41.6511206, 'lng' : 2.7646659 } } }, 'place_id' : 'ChIJQ40kOPM9uxIRgolj8LA4DtA', 'types' : [ 'locality', 'political' ] } ], 'status' : 'OK' }";
            mock.Setup(
                x => x.GetAsync(
                            It.Is<string>(r => r == geocodeUri),
                            It.Is<Dictionary<string, string>>(p => p.CompareTo<string, string>(parametersGeocoder))
                    ))
                .Returns(Task.FromResult<string>(responseGeocoder));
        }

        private static void DistanceMatrixOriginDest(Mock<IHttpProvider> mock)
        {
            Dictionary<string, string> parametersSingleDma = new Dictionary<string, string>();
            parametersSingleDma.Add("key", gmapsKey);
            parametersSingleDma.Add("origins", "Washington,DC");
            parametersSingleDma.Add("destinations", "New+York+City,NY");

            string responseSingleDma = @"{ 'destination_addresses' : [ 'New York, NY, USA' ], 'origin_addresses' : [ 'Washington, DC, USA' ], 'rows' : [ { 'elements' : [ { 'distance' : { 'text' : '225 mi', 'value' : 361715 }, 'duration' : { 'text' : '3 hours 49 mins', 'value' : 13725 }, 'status' : 'OK' } ] } ], 'status' : 'OK' }";
            mock.Setup(
                x => x.GetAsync(
                        It.Is<string>(r => r == distanceMatrixUri),
                        It.Is<Dictionary<string, string>>(p => p.CompareTo<string, string>(parametersSingleDma))
                    ))
                .Returns(Task.FromResult<string>(responseSingleDma));
        }

        private static void DistanceMatrixWithWaypoint(Mock<IHttpProvider> mock)
        {
            Dictionary<string, string> parametersMultipleDma = new Dictionary<string, string>();
            parametersMultipleDma.Add("key", gmapsKey);
            parametersMultipleDma.Add("origins", "52.406563,16.925853|51.766664,19.478922");
            parametersMultipleDma.Add("destinations", "51.766664,19.478922|52.227799,20.985093");

            string responseMultipleDma = @"{ 'destination_addresses' : [ 'Przędzalniana 3, 90-034 Łódź, Polska', 'Towarowa 7A, Warszawa, Polska' ], 'origin_addresses' : [ 'Piekary 25, 61-823 Poznań, Polska', 'Wysoka 7-9, 90-023 Łódź, Polska' ], 'rows' : [ { 'elements' : [ { 'distance' : { 'text' : '216 km', 'value' : 216020 }, 'duration' : { 'text' : '2 godz. 18 min', 'value' : 8296 }, 'status' : 'OK' }, { 'distance' : { 'text' : '310 km', 'value' : 310440 }, 'duration' : { 'text' : '3 godz. 1 min', 'value' : 10840 }, 'status' : 'OK' } ] }, { 'elements' : [ { 'distance' : { 'text' : '1 m', 'value' : 0 }, 'duration' : { 'text' : '1 min', 'value' : 0 }, 'status' : 'OK' }, { 'distance' : { 'text' : '128 km', 'value' : 127627 }, 'duration' : { 'text' : '1 godz. 27 min', 'value' : 5228 }, 'status' : 'OK' } ] } ], 'status' : 'OK' }";
            mock.Setup(
               x => x.GetAsync(
                        It.Is<string>(r => r == distanceMatrixUri),
                        It.Is<Dictionary<string, string>>(p => p.CompareTo<string, string>(parametersMultipleDma))
                   ))
               .Returns(Task.FromResult<string>(responseMultipleDma));
        }

        private static void DirectionsOriginDest(Mock<IHttpProvider> mock)
        {
            Dictionary<string, string> parametersSingleDirections = new Dictionary<string, string>();
            parametersSingleDirections.Add("key", gmapsKey);
            parametersSingleDirections.Add("origin", "54.410392,18.565325");
            parametersSingleDirections.Add("destination", "54.421006,18.572821");

            string responseSingleDirections = @"{ 'geocoded_waypoints' : [ { 'geocoder_status' : 'OK', 'place_id' : 'ChIJ63RuMDN1_UYR3sKtO5IO2Ps', 'types' : [ 'street_address' ] }, { 'geocoder_status' : 'OK', 'place_id' : 'ChIJ5-9LjMUK_UYRylsIrvaTrhs', 'types' : [ 'street_address' ] } ], 'routes' : [ { 'bounds' : { 'northeast' : { 'lat' : 54.421902, 'lng' : 18.5733124 }, 'southwest' : { 'lat' : 54.4101308, 'lng' : 18.5654455 } }, 'copyrights' : 'Dane do Mapy ©2018 Google', 'legs' : [ { 'distance' : { 'text' : '1,9 km', 'value' : 1937 }, 'duration' : { 'text' : '6 min', 'value' : 353 }, 'end_address' : 'Sztormowa 5, Gdańsk, Polska', 'end_location' : { 'lat' : 54.42125309999999, 'lng' : 18.5728789 }, 'start_address' : 'Opata Jacka Rybińskiego 6, Gdańsk, Polska', 'start_location' : { 'lat' : 54.4101308, 'lng' : 18.5654455 }, 'steps' : [ { 'distance' : { 'text' : '81 m', 'value' : 81 }, 'duration' : { 'text' : '1 min', 'value' : 16 }, 'end_location' : { 'lat' : 54.4103191, 'lng' : 18.5666507 }, 'html_instructions' : 'Kieruj się \u003cb\u003eOpata Jacka Rybińskiego\u003c/b\u003e/\u003cb\u003eDW218\u003c/b\u003e na \u003cb\u003ewschód\u003c/b\u003e', 'polyline' : { 'points' : 'i~akIaaipBe@oF' }, 'start_location' : { 'lat' : 54.4101308, 'lng' : 18.5654455 }, 'travel_mode' : 'DRIVING' }, { 'distance' : { 'text' : '0,5 km', 'value' : 473 }, 'duration' : { 'text' : '2 min', 'value' : 91 }, 'end_location' : { 'lat' : 54.4140976, 'lng' : 18.5664486 }, 'html_instructions' : 'Skręć \u003cb\u003ew lewo\u003c/b\u003e w \u003cb\u003ealeja Grunwaldzka\u003c/b\u003e/\u003cb\u003eDW468\u003c/b\u003e', 'maneuver' : 'turn-left', 'polyline' : { 'points' : 'o_bkIqhipB@U?i@Bg@GMGKIIIDEDgAr@OJGBQRs@\\IDm@\\y@Vi@J[BY@i@AuBO[Ac@EY?Y?SAO?_@?' }, 'start_location' : { 'lat' : 54.4103191, 'lng' : 18.5666507 }, 'travel_mode' : 'DRIVING' }, { 'distance' : { 'text' : '0,4 km', 'value' : 445 }, 'duration' : { 'text' : '1 min', 'value' : 51 }, 'end_location' : { 'lat' : 54.4159477, 'lng' : 18.5724753 }, 'html_instructions' : 'Skręć \u003cb\u003ew prawo\u003c/b\u003e w \u003cb\u003ePomorska\u003c/b\u003e', 'maneuver' : 'turn-right', 'polyline' : { 'points' : 'cwbkIigipBMi@?Ci@iAAAEEACa@gBCMqBoJKg@Ke@Ou@AQ?KAEIi@MeAO{AI_@Oo@UgAS_A' }, 'start_location' : { 'lat' : 54.4140976, 'lng' : 18.5664486 }, 'travel_mode' : 'DRIVING' }, { 'distance' : { 'text' : '0,7 km', 'value' : 725 }, 'duration' : { 'text' : '2 min', 'value' : 131 }, 'end_location' : { 'lat' : 54.42178579999999, 'lng' : 18.5700669 }, 'html_instructions' : 'Skręć \u003cb\u003ew lewo\u003c/b\u003e w \u003cb\u003eSubisława\u003c/b\u003e', 'maneuver' : 'turn-left', 'polyline' : { 'points' : 'ubckI_mjpBAE?CYaA[yAK?KBKFGJOXIVCDQ\\a@^q@f@GFELcC~AgAn@IDYPUNSFKDC@s@XoAf@yC`AsBj@WHC?g@NyCh@' }, 'start_location' : { 'lat' : 54.4159477, 'lng' : 18.5724753 }, 'travel_mode' : 'DRIVING' }, { 'distance' : { 'text' : '30 m', 'value' : 30 }, 'duration' : { 'text' : '1 min', 'value' : 10 }, 'end_location' : { 'lat' : 54.4218967, 'lng' : 18.5704565 }, 'html_instructions' : 'Skręć \u003cb\u003ew prawo\u003c/b\u003e, kierunek: \u003cb\u003eSztormowa\u003c/b\u003e', 'maneuver' : 'turn-right', 'polyline' : { 'points' : 'egdkI}}ipBIMCGAECGAI?M?Q' }, 'start_location' : { 'lat' : 54.42178579999999, 'lng' : 18.5700669 }, 'travel_mode' : 'DRIVING' }, { 'distance' : { 'text' : '0,1 km', 'value' : 140 }, 'duration' : { 'text' : '1 min', 'value' : 37 }, 'end_location' : { 'lat' : 54.4213052, 'lng' : 18.5722214 }, 'html_instructions' : 'Skręć \u003cb\u003ew prawo\u003c/b\u003e w \u003cb\u003eSztormowa\u003c/b\u003e', 'maneuver' : 'turn-right', 'polyline' : { 'points' : '{gdkIk`jpBf@kAf@eARg@HYHUDc@?e@Gk@' }, 'start_location' : { 'lat' : 54.4218967, 'lng' : 18.5704565 }, 'travel_mode' : 'DRIVING' }, { 'distance' : { 'text' : '43 m', 'value' : 43 }, 'duration' : { 'text' : '1 min', 'value' : 17 }, 'end_location' : { 'lat' : 54.42125309999999, 'lng' : 18.5728789 }, 'html_instructions' : 'Lekko \u003cb\u003ew prawo\u003c/b\u003e\u003cdiv style=\'font-size:0.9em\'\u003eMiejsce docelowe będzie po prawej stronie\u003c/div\u003e', 'maneuver' : 'turn-slight-right', 'polyline' : { 'points' : 'eddkIkkjpBJcC' }, 'start_location' : { 'lat' : 54.4213052, 'lng' : 18.5722214 }, 'travel_mode' : 'DRIVING' } ], 'traffic_speed_entry' : [], 'via_waypoint' : [] } ], 'overview_polyline' : { 'points' : 'i~akIaaipBe@oF@UBqAOYIIIDmAx@WNQRs@\\w@b@cBb@u@D_DQ_AGwAA_@?Mi@i@mAGGc@kBmCkMQgAAQq@kF{@}DYeA[yAK?WJWd@M\\Q\\a@^y@n@ELoFfDi@VOFcC`AyC`AsBj@[Hg@NyCh@MUEMAW?Qf@kAz@mBRo@Dc@?e@Gk@JcC' }, 'summary' : 'Pomorska i Subisława', 'warnings' : [], 'waypoint_order' : [] } ], 'status' : 'OK' }";


            mock.Setup(
               x => x.GetAsync(
                        It.Is<string>(r => r == directionsUri),
                        It.Is<Dictionary<string, string>>(p => p.CompareTo<string, string>(parametersSingleDirections))
                   ))
               .Returns(Task.FromResult<string>(responseSingleDirections));
        }

        private static void DirectionsWithWaypoint(Mock<IHttpProvider> mock)
        {
            Dictionary<string, string> parametersMultiDirections = new Dictionary<string, string>();
            parametersMultiDirections.Add("key", gmapsKey);
            parametersMultiDirections.Add("origin", "52.406563,16.925853");
            parametersMultiDirections.Add("destination", "51.766664,19.478922");
            parametersMultiDirections.Add("waypoints", "52.227799,20.985093");

            string responseMultiDirections = @"{ 'geocoded_waypoints' : [ { 'geocoder_status' : 'OK', 'place_id' : 'EiJQaWVrYXJ5IDI1LCA2MS04MjMgUG96bmHFhCwgUG9sc2th', 'types' : [ 'street_address' ] }, { 'geocoder_status' : 'OK', 'place_id' : 'ChIJTYdYRZrMHkcRT2EF6c6KbaY', 'types' : [ 'street_address' ] }, { 'geocoder_status' : 'OK', 'place_id' : 'ChIJ76ZCezHLG0cRM_L1kDfcvck', 'types' : [ 'street_address' ] } ], 'routes' : [ { 'bounds' : { 'northeast' : { 'lat' : 52.4060478, 'lng' : 20.9885927 }, 'southwest' : { 'lat' : 51.7667596, 'lng' : 16.9220459 } }, 'copyrights' : 'Dane do Mapy ©2018 Google', 'legs' : [ { 'distance' : { 'text' : '310 km', 'value' : 310440 }, 'duration' : { 'text' : '3 godz. 1 min', 'value' : 10841 }, 'end_address' : 'Towarowa 7A, Warszawa, Polska', 'end_location' : { 'lat' : 52.22808999999999, 'lng' : 20.9849365 }, 'start_address' : 'Piekary 25, 61-823 Poznań, Polska', 'start_location' : { 'lat' : 52.4060478, 'lng' : 16.9272175 }, 'steps' : [ { 'distance' : { 'text' : '0,3 km', 'value' : 273 }, 'duration' : { 'text' : '1 min', 'value' : 82 }, 'end_location' : { 'lat' : 52.40568099999999, 'lng' : 16.9311547 }, 'html_instructions' : 'Kieruj się \u003cb\u003eŚwięty Marcin\u003c/b\u003e na \u003cb\u003ewschód\u003c/b\u003e w stronę \u003cb\u003eAleje Marcinkowskiego\u003c/b\u003e', 'polyline' : { 'points' : 'ypz~HcbifBRcET_HBm@NaF?K@C?E@A?A@A@?@A@?' }, 'start_location' : { 'lat' : 52.4060478, 'lng' : 16.9272175 }, 'travel_mode' : 'DRIVING' }, { 'distance' : { 'text' : '0,3 km', 'value' : 277 }, 'duration' : { 'text' : '1 min', 'value' : 82 }, 'end_location' : { 'lat' : 52.403697, 'lng' : 16.9288582 }, 'html_instructions' : '\u003cb\u003eŚwięty Marcin\u003c/b\u003e skręca \u003cb\u003ew prawo\u003c/b\u003e i przechodzi w \u003cb\u003eKrysiewicza\u003c/b\u003e', 'polyline' : { 'points' : 'onz~HuzifBp@F\\FFDFDHJ`CxD~CfF' }, 'start_location' : { 'lat' : 52.40568099999999, 'lng' : 16.9311547 }, 'travel_mode' : 'DRIVING' } ], 'traffic_speed_entry' : [], 'via_waypoint' : [] }, { 'distance' : { 'text' : '126 km', 'value' : 125808 }, 'duration' : { 'text' : '1 godz. 27 min', 'value' : 5208 }, 'end_address' : 'Przędzalniana 3, 90-034 Łódź, Polska', 'end_location' : { 'lat' : 51.7667596, 'lng' : 19.4799855 }, 'start_address' : 'Towarowa 7A, Warszawa, Polska', 'start_location' : { 'lat' : 52.22808999999999, 'lng' : 20.9849365 }, 'steps' : [ { 'distance' : { 'text' : '71 m', 'value' : 71 }, 'duration' : { 'text' : '1 min', 'value' : 20 }, 'end_location' : { 'lat' : 52.22832349999999, 'lng' : 20.9859064 }, 'html_instructions' : 'Kieruj się na \u003cb\u003ewschód\u003c/b\u003e w stronę \u003cb\u003eTowarowa\u003c/b\u003e/\u003cb\u003eDW634\u003c/b\u003e', 'polyline' : { 'points' : 'qxw}H{ra_CUgBCWEUMk@' }, 'start_location' : { 'lat' : 52.22808999999999, 'lng' : 20.9849365 }, 'travel_mode' : 'DRIVING' }, { 'distance' : { 'text' : '0,4 km', 'value' : 415 }, 'duration' : { 'text' : '2 min', 'value' : 124 }, 'end_location' : { 'lat' : 52.2249949, 'lng' : 20.9886034 }, 'html_instructions' : 'Skręć \u003cb\u003ew prawo\u003c/b\u003e w \u003cb\u003eTowarowa\u003c/b\u003e/\u003cb\u003eDW634\u003c/b\u003e', 'maneuver' : 'turn-right', 'polyline' : { 'points' : '_zw}H}xa_CtAkAbAw@PQJINQHOHMFKHIJIRQRMLKDCHCNGNGFCFC^Sn@i@tB}Ab@[^YBADABABADAFA' }, 'start_location' : { 'lat' : 52.22832349999999, 'lng' : 20.9859064 }, 'travel_mode' : 'DRIVING' } ], 'traffic_speed_entry' : [], 'via_waypoint' : [] } ], 'overview_polyline' : { 'points' : 'ypz~HcbifB`D{VrI~OxA`\\fA~AANHVb@d@tEtCbFkPbKcyAlV{wAlX{cAr`@ai@n~AarBpmBql@xm@kHiEzEpD}fAzd@oaFdmAczIdxA}~Gp[_yC}Dk`DkJ{`Gr@ggKT{wHuLscEkYgyCePg~EnAyhD|GyvHf[shDtRiuDrO_hCpa@guCnbAsuGndB{eGpg@akCn\\kpEjm@ybHdeAmbI~pAurGp~@{{G|eAg_H`l@k}Dhj@}eCxTqlB`h@ulCx[ilCzeA}kInYopCxQ_bCzYs~GrZmdBn[}rBpR}pCv[gdC|C_nDsKw~DwUqjD}e@seFDyuAbL{aBjn@s`FhGskCgCguFtJqiCla@c}C`iA{rHxl@awGddBihFzn@ciBpxA}vBduAk`D|hCupEto@}uB~e@{lDjt@qnD`x@axE~ZipAha@{cCpSkoCnXopBfk@mdB~jAemC`i@yaCvh@unBln@}nD|h@ufCx^epCxOsyHvw@gnI|JkaCr_@k`FrKw`HhXkpB|f@gkBho@scCxToaDkAmpDjMssC`f@svElEgzAsHk}CeOypEmRosBaHyhDuRmdC{i@giCooBctG}`AanD{yAsvD_t@cz@o_BgbD}{AgvCmmAoaGm{@k~BcaAiuDy}Ay{Eyq@afE}bAcgNmdBiuL_PcdElN}tHkBacC}L_aB}b@_cCiZkaA}b@g{Aaf@soEgxAc_Ls~@apHe}@cnEe{AwqLwn@qvJuu@whH}t@q~Ckr@qeB}`@cWoUih@kLiqAiH}zAkKwjAu]a}AnAmfAxbAajB~~@e}ChVihBlOmXuFcVce@vA_~@_VibBarCc{@ozAkHcZwHvBar@~MuLkE_Cm_AiG_xArRoW`J{FvKth@v`@tjBxl@f}A|aAfcB`k@vaA|Ux]fQtEjq@rR~PfYo@dVgKf}@uO|{@}c@|yA_Zd~@m`@pn@}[vu@jNn|AjZhbBzDvmArGh|@rU~|Ax~@v|@zm@rqBno@~gDr`AxaKtf@t~HjgAdaIjv@z|Dh_AjwGzk@xqEzs@~qFv\\l}D`n@|iCnd@x|A~d@hdDfH``D_HjuCkElpEba@f|Fvy@niFpw@poHx^tjGb^luCn`@vhBxyAfqEvh@r~Blb@~aAze@fsAtoAdiGdw@rdB|mB~uDdmAt~Ab~BflGz{@rvDfoBfpGfZlhCnJr`Ev]duFdOvkFwDda@jj@t]bu@~i@thBfcA~wAde@tNdTnbA`yClcAvyC`bAz[p^pm@hYle@~l@Kz_@`Zxh@dLlNjPz~@yH' }, 'summary' : 'A2', 'warnings' : [], 'waypoint_order' : [ 0 ] } ], 'status' : 'OK' }";

            mock.Setup(
              x => x.GetAsync(
                        It.Is<string>(r => r == directionsUri),
                        It.Is<Dictionary<string, string>>(p => p.CompareTo<string, string>(parametersMultiDirections))
                  ))
              .Returns(Task.FromResult<string>(responseMultiDirections));

        }
    }
}
